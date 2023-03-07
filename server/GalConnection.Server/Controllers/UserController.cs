using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using GalConnection.Entity;
using GalConnection.Model;
using System.Security.Claims;
using GalConnection.Server.Services;
using Microsoft.AspNetCore.Hosting;

namespace GalConnection.Server.Controllers.User
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        string filepath;
        readonly GalConnectionContext Context;
        readonly OssServices ossServices;
        readonly UserServices userServices;
        public UserController(GalConnectionContext context, IWebHostEnvironment webHostEnvironment)
        {
            Context = context;
            ossServices = new OssServices(Context);
            _webHostEnvironment = webHostEnvironment;
            filepath = _webHostEnvironment.ContentRootPath + "/fileCache/";
            userServices = new UserServices(Context);
        }
        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        public IActionResult UserSginUp(SignUpModel userInfo)
        {
            try
            {
                userServices.UserSginUp(userInfo);
                return Ok("注册成功");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
        /// <summary>
        /// 登录
        /// </summary>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        public IActionResult Login(LoginModel user)
        {
            try
            {
                return Ok(userServices.Login(user));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 显示本人用户信息
        /// </summary>
        /// <returns></returns>
        [EnableCors("any")]
        [Authorize]
        [HttpGet]
        public IActionResult GetSelfInfo()
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(userServices.GetSelfInfo(userID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 显示用户信息
        /// </summary>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        public IActionResult GetUserInfo(int userId)
        {
            try
            {
                return Ok(userServices.GetUserInfo(userId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// 编辑用户信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult EditUserInfo(UserEditModel user)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(userServices.EditUserInfo(user, userID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 上传用户头像
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> EditAvatar(string url)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(userServices.AvatarUpload(url, userID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 上传用户头图
        /// </summary>
        /// <param name="file"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> EditBanner(string url)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(userServices.BannerUpload(url, userID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 搜索用户
        /// </summary>
        /// <param name="searchContent"></param>
        /// <param name="position"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult SearchUser(string searchContent, int position, int limit)
        {
            try
            {
                return Ok(userServices.SearchUser(searchContent, position, limit));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
