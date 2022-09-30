using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using GalConnection.Entity;
using GalConnection.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
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
            return Ok(userServices.Login(user));
        }
        /// <summary>
        /// 显示本人用户信息
        /// </summary>
        /// <returns></returns>
        [EnableCors("any")]
        [Authorize]
        [HttpGet]
        public IActionResult getSelfInfo()
        {
            var auth = HttpContext.AuthenticateAsync();
            int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
            Entity.User user = Context.User.FirstOrDefault(x => x.id == userID);
            if (user != null)
            {
                return Ok(Utils.ChangeModel.userToShowModel(user));
            }
            else
            {
                return BadRequest();
            }
        }

        /// <summary>
        /// 显示用户信息
        /// </summary>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        public IActionResult getUserInfo(string nickname)
        {
            Entity.User user = Context.User.FirstOrDefault(x => x.nickname == nickname);
            if (user != null)
            {
                return Ok(Utils.ChangeModel.userToShowModel(user));
            }
            else
            {
                return BadRequest();
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
        public IActionResult editUserInfo(UserShowModel user)
        {
            var auth = HttpContext.AuthenticateAsync();
            int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
            bool isEmailHave = Context.User.ToList().Exists(x => x.email == user.email && x.id!= userID);
            bool isNameHave = Context.User.ToList().Exists(x => x.nickname == user.nickname && x.id != userID);
            if (isEmailHave)
            {
                return BadRequest("邮箱已被注册");
            }
            if (isNameHave)
            {
                return BadRequest("用户名已被注册");
            }
            Entity.User userT = Context.User.FirstOrDefault(x => x.id == userID);
            if (userT != null)
            {
                userT.nickname = user.nickname;
                userT.avatar = user.avatar;
                userT.email = user.email;
                Context.SaveChanges();
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
