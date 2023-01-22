using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace GalConnection.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class OssController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        string filepath;
        readonly GalConnectionContext Context;
        readonly OssServices ossServices;
        public OssController(GalConnectionContext context, IWebHostEnvironment webHostEnvironment)
        {
            Context = context;
            ossServices = new OssServices(Context);
            _webHostEnvironment = webHostEnvironment;
            filepath = _webHostEnvironment.ContentRootPath + "/fileCache/";
        }
        /// <summary>
        /// 上传文件
        /// </summary>
        /// <param name="file"></param>
        /// <param name="ossFileType"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [Authorize]
        [HttpPost]
        [DisableRequestSizeLimit]
        public async Task<IActionResult> Upload(IFormFile file, OssFileType ossFileType)
        {
            try
            {
                string url = await ossServices.OssUpload(file, filepath, ossFileType);
                return Ok(url);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
