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

namespace GalConnection.Server.Controllers.User
{
    [ApiController]
    [Route("api/User/[controller]/[action]")]
    public class UserController : Controller
    {
        GalConnectionContext Context;
        public UserController(GalConnectionContext context)
        {
            Context = context;
        }
        /// <summary>
        /// 注册
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        public IActionResult userSginUp(SignUpModel userInfo)
        {
            try
            {
                bool isEmailHave = Context.User.ToList().Exists(x => x.email == userInfo.email );
                bool isNameHave = Context.User.ToList().Exists(x => x.nickname == userInfo.nickname);
                if (isEmailHave)
                {
                    return BadRequest("邮箱已被注册");
                }
                if (isNameHave)
                {
                    return BadRequest("用户名已被注册");
                }
                Entity.User user = Utils.ChangeModel.signUpToUser(userInfo);
                Context.User.Add(user);
                Context.SaveChanges();
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
            Entity.User result = Context.User.FirstOrDefault(x => x.email == user.email && x.password == user.password);
            if (result != null)
            {
                var claims = new[]
                {
                    new Claim(JwtRegisteredClaimNames.Nbf,$"{new DateTimeOffset(DateTime.Now).ToUnixTimeSeconds()}") ,
                    new Claim (JwtRegisteredClaimNames.Exp,$"{new DateTimeOffset(DateTime.Now.AddMinutes(60*24*7)).ToUnixTimeSeconds()}"),
                    new Claim(ClaimTypes.Sid, result.id.ToString())
                };
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("QANstarAndSuoMi1931"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: "QANstar",
                    audience: "QANstar",
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(60 * 24 * 7),
                    signingCredentials: creds);

                var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                return Ok(jwtToken);
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
        [Authorize]
        [HttpGet]
        public IActionResult showUserInfo()
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
