using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using GalConnection.Entity;
using GalConnection.Model;
using System.Security.Claims;
using GalConnection.Server.Services;

namespace GalConnection.Server.Controllers.User
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class UserController : Controller
    {
        readonly GalConnectionContext Context;
        readonly UserServices userServices;
        public UserController(GalConnectionContext context)
        {
            Context = context;
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
<<<<<<< HEAD
        public IActionResult EditUserInfo(UserShowModel user)
=======
        public IActionResult editUserInfo(UserEditModel user)
>>>>>>> 9fdb90985979753009d309d5a308d2453f3236a8
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
    }
}
