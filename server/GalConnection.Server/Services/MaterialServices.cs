using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Setting;
using GalConnection.Server.Utils;
using System.Security.Cryptography;
using System.Text.RegularExpressions;

namespace GalConnection.Server.Services
{
    public class MaterialServices
    {
        readonly GalConnectionContext Context;
        public MaterialServices(GalConnectionContext context)
        {
            Context = context;
        }
        /// <summary>
        /// 创建文件夹
        /// </summary>
        /// <param name="createFileModel"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int CreateFolder(CreateFloderModel createFileModel, int userId)
        {
            bool isHaveName = Context.MaterialFile.ToList().Exists(x => x.name == createFileModel.name);
            if (isHaveName)
            {
                throw new Exception("文件名称重复");
            }
            MaterialFile materialFile = new()
            {
                name = createFileModel.name,
                userId = userId,
                groupId = createFileModel.groupId,
                type = FileType.FOLDER,
                pid = createFileModel.pid,
                creactTime = TimeUtils.GetNowTime(),
                editTime = TimeUtils.GetNowTime(),
                state = FileState.EXIST
            };
            Context.MaterialFile.Add(materialFile);
            Context.SaveChanges();
            return materialFile.id;
        }
        /// <summary>
        /// 创建文件
        /// </summary>
        /// <param name="createFileModel"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int CreateFile(CreateFileModel createFileModel, int userId)
        {
            bool isHaveName = Context.MaterialFile.ToList().Exists(x => x.name == createFileModel.name);
            if (isHaveName)
            {
                throw new Exception("文件名称重复");
            }
            MaterialFile materialFile = new()
            {
                name = createFileModel.name,
                userId = userId,
                groupId = createFileModel.groupId,
                type = createFileModel.type,
                pid = createFileModel.pid,
                creactTime = TimeUtils.GetNowTime(),
                editTime = TimeUtils.GetNowTime(),
                state = FileState.EXIST
            };
            Context.MaterialFile.Add(materialFile);
            Context.SaveChanges();
            Material material = new()
            {
                type = createFileModel.type,
                link = createFileModel.link,
                fileId = materialFile.id,
                useId = userId,
                createTime = TimeUtils.GetNowTime(),
                editTime = TimeUtils.GetNowTime()
            };
            Context.Material.Add(material);
            Context.SaveChanges();
            return material.id;
        }
        /// <summary>
        /// 删除文件
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool DelFile(int fileId, int userId)
        {
            MaterialFile materialFile = Context.MaterialFile.FirstOrDefault(x => x.id == fileId);
            if (materialFile == null)
            {
                throw new Exception("文件不存在");
            }
            if (!CheckRole(materialFile.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("权限不足");
            }
            materialFile.state = FileState.DELETE;
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 重命名
        /// </summary>
        /// <param name="newName"></param>
        /// <param name="fileId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool Rename(string newName, int fileId, int userId)
        {
            MaterialFile materialFile = Context.MaterialFile.FirstOrDefault(x => x.id == fileId);
            if (materialFile == null)
            {
                throw new Exception("文件不存在");
            }
            if (!CheckRole(materialFile.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("权限不足");
            }
            materialFile.name = newName;
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 获取当前文件夹下所有文件
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="pid"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<MaterialFile> GetFiles(int groupId, int pid, int userId)
        {
            if (!CheckRole(groupId, userId, GroupRole.READER))
            {
                throw new Exception("权限不足");
            }
            List<MaterialFile> materialFiles = Context.MaterialFile.Where(x => x.pid == pid && x.state != FileState.DELETE).ToList();
            return materialFiles;
        }
        /// <summary>
        /// 获取当前组所有文件夹
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<MaterialFile> GetFolders(int groupId, int userId)
        {
            if (!CheckRole(groupId, userId, GroupRole.READER))
            {
                throw new Exception("权限不足");
            }
            List<MaterialFile> materialFiles = Context.MaterialFile.Where(x => x.groupId == groupId && x.type == FileType.FOLDER && x.state != FileState.DELETE).ToList();
            return materialFiles;
        }
        /// <summary>
        /// 获取指定文件夹下所有文件夹
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="pid"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<MaterialFile> GetFoldersByPid(int groupId, int pid, int userId)
        {
            if (!CheckRole(groupId, userId, GroupRole.READER))
            {
                throw new Exception("权限不足");
            }
            List<MaterialFile> materialFiles = Context.MaterialFile.Where(x => x.groupId == groupId && x.pid == pid && x.type == FileType.FOLDER && x.state != FileState.DELETE).ToList();
            return materialFiles;
        }
        /// <summary>
        /// 获取该用户所有的group
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<View_Group> GetGroupOfUser(int userId)
        {
            List<View_Group> groups = Context.View_Group.Where(x => x.userId == userId).ToList();
            return groups;
        }
        /// <summary>
        /// 获取文件资源url
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="fileId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string GetFileUrl(int groupId, int fileId, int userId)
        {
            if (!CheckRole(groupId, userId, GroupRole.READER))
            {
                throw new Exception("权限不足");
            }
            Material materials = Context.Material.FirstOrDefault(x => x.fileId == fileId);
            if (materials == null)
            {
                return "";
            }
            return materials.link;
        }
        /// <summary>
        /// 检查权限
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="userId"></param>
        /// <param name="needRole"></param>
        /// <returns></returns>
        private bool CheckRole(int groupId, int userId, int needRole)
        {
            UserGroup userGroup = Context.UserGroup.FirstOrDefault(x => x.groupId == groupId && x.userId == userId);
            if (userGroup == null)
            {
                return false;
            }
            else
            {
                if (userGroup.role <= needRole)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }
    }
}
