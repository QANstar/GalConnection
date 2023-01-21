using Aliyun.OSS;
using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Config;
using Microsoft.AspNetCore.Mvc;
using System.Security.AccessControl;
using System.Threading.Tasks;

namespace GalConnection.Server.Services
{
    public class OssServices
    {
        readonly GalConnectionContext Context;
        readonly OssClient client = new OssClient(OssConfig.endpoint, OssConfig.accessKeyId, OssConfig.accessKeySecret);
        public OssServices(GalConnectionContext context)
        {
            Context = context;
        }
        /// <summary>
        /// 上传到本地
        /// </summary>
        /// <param name="file"></param>
        /// <param name="folderPath"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        private static async Task<string> Upload(IFormFile file, string folderPath, string fileName)
        {
            if (file == null)
            {
                throw new Exception("请上传文件");
            }
            if (!System.IO.Directory.Exists(folderPath))
            {
                Directory.CreateDirectory(folderPath);
            }
            var saveName = folderPath + fileName;

            using (FileStream fs = System.IO.File.Create(saveName))
            {
                await file.CopyToAsync(fs);
                fs.Flush();
            }
            return "上传成功";
        }
        /// <summary>
        /// oss 上传文件
        /// </summary>
        /// <param name="localFilename"></param>
        /// <param name="objectName"></param>
        public async Task<string> OssUpload(IFormFile file, string folderPath, OssFileType type)
        {
            string url = "https://galbucket.oss-cn-hangzhou.aliyuncs.com/";
            try
            {
                string ossFolder = "";
                switch (type)
                {
                    case OssFileType.Avatar:
                        ossFolder = "user/avatar/";
                        break;
                    case OssFileType.Banner:
                        ossFolder = "user/banner/";
                        break;
                    case OssFileType.Background:
                        ossFolder = "game/background/";
                        break;
                    case OssFileType.CG:
                        ossFolder = "game/cg/";
                        break;
                    case OssFileType.Character:
                        ossFolder = "game/character/";
                        break;
                    case OssFileType.Cover:
                        ossFolder = "game/cover/";
                        break;
                    case OssFileType.Picture:
                        ossFolder = "game/picture/";
                        break;
                    case OssFileType.Video:
                        ossFolder = "game/video/";
                        break;
                    case OssFileType.Sound:
                        ossFolder = "game/sound/";
                        break;
                }
                string guid = Guid.NewGuid().ToString();
                string fileName = guid + Path.GetExtension(file.FileName);
                url = url + ossFolder + fileName;
                await Upload(file, folderPath, fileName);
                // 上传文件。
                client.PutObject(OssConfig.bucketName, ossFolder + fileName, folderPath + fileName);
                File.Delete(folderPath + fileName);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return url;
        }
    }
}
