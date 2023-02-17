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
        readonly GroupServices groupServices;
        public MaterialServices(GalConnectionContext context)
        {
            Context = context;
            groupServices = new GroupServices(context);
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
        /// 更换文件夹
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="folderId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public int MoveFolder(int fileId, int folderId, int userId)
        {
            MaterialFile materialFile = Context.MaterialFile.FirstOrDefault(x => x.id == fileId);
            if (materialFile == null)
            {
                throw new Exception("文件不存在");
            }
            if (!groupServices.CheckRole(materialFile.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("权限不足");
            }
            materialFile.pid = folderId;
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
            if (!groupServices.CheckRole(materialFile.groupId, userId, GroupRole.WRITER))
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
            if (!groupServices.CheckRole(materialFile.groupId, userId, GroupRole.WRITER))
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
            if (!groupServices.CheckRole(groupId, userId, GroupRole.READER))
            {
                throw new Exception("权限不足");
            }
            List<MaterialFile> materialFiles = Context.MaterialFile.Where(x => x.pid == pid && x.state != FileState.DELETE).ToList();
            return materialFiles;
        }
        // 根据类型获取当前文件夹文件
        public List<MaterialFile> GetFilesByType(int groupId, int pid, int userId, string type)
        {
            if (!groupServices.CheckRole(groupId, userId, GroupRole.READER))
            {
                throw new Exception("权限不足");
            }
            if (type == "all")
            {
                List<MaterialFile> materialFiles = Context.MaterialFile.Where(x => x.pid == pid && x.state != FileState.DELETE).ToList();
                return materialFiles;
            }
            else
            {
                List<MaterialFile> materialFiles = Context.MaterialFile.Where(x => x.pid == pid && x.state != FileState.DELETE && (x.type == type || x.type == FileType.FOLDER)).ToList();
                return materialFiles;
            }

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
            if (!groupServices.CheckRole(groupId, userId, GroupRole.READER))
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
            if (!groupServices.CheckRole(groupId, userId, GroupRole.READER))
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
            if (!groupServices.CheckRole(groupId, userId, GroupRole.READER))
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
        /// 获取文件夹信息
        /// </summary>
        /// <param name="groupId"></param>
        /// <param name="fileId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public FolderInfoModel GetFolderInfo(int groupId, int fileId, int userId)
        {
            if (!groupServices.CheckRole(groupId, userId, GroupRole.READER))
            {
                throw new Exception("权限不足");
            }
            FolderInfoModel folderInfoModel = new FolderInfoModel();
            if (fileId == 0)
            {
                Entity.Group group = Context.Group.FirstOrDefault(x => x.id == groupId);
                if (group == null)
                {
                    throw new Exception("组不存在");
                }
                folderInfoModel.id = group.id;
                folderInfoModel.pid = null;
                folderInfoModel.name = group.name;
                folderInfoModel.groupId = group.id;
                folderInfoModel.createTime = group.createTime;
            }
            else
            {
                MaterialFile materialFile = Context.MaterialFile.FirstOrDefault(x => x.id == fileId);
                if (materialFile == null)
                {
                    throw new Exception("文件夹不存在");
                }
                folderInfoModel.id = materialFile.id;
                folderInfoModel.pid = materialFile.pid;
                folderInfoModel.name = materialFile.name;
                folderInfoModel.groupId = materialFile.groupId;
                folderInfoModel.createTime = materialFile.creactTime;
            }
            return folderInfoModel;
        }
        /// <summary>
        /// 根据id获取文件
        /// </summary>
        /// <param name="fileId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public MaterialFile GetFileInfoById(int fileId, int userId)
        {
            MaterialFile materialFile = Context.MaterialFile.FirstOrDefault(x => x.id == fileId);
            if (materialFile == null)
            {
                throw new Exception("文件不存在");
            }
            if (!groupServices.CheckRole(materialFile.groupId, userId, GroupRole.READER))
            {
                throw new Exception("权限不足");
            }

            return materialFile;
        }
    }
}
