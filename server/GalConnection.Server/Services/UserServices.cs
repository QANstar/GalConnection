using Microsoft.IdentityModel.Tokens;
using GalConnection.Entity;
using GalConnection.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using GalConnection.Server.Config;
using GalConnection.Server.Setting;
using GalConnection.Server.Utils;

namespace GalConnection.Server.Services
{
    public class UserServices
    {
        readonly GalConnectionContext Context;
        public UserServices(GalConnectionContext context)
        {
            Context = context;
        }

        /// <summary>
        /// 用户注册
        /// </summary>
        /// <param name="userInfo"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool UserSginUp(SignUpModel userInfo)
        {
            bool isEmailHave = Context.User.ToList().Exists(x => x.email == userInfo.email);
            bool isNameHave = Context.User.ToList().Exists(x => x.nickname == userInfo.nickname);
            if (isEmailHave)
            {
                throw new Exception("邮箱已被注册");
            }
            if (isNameHave)
            {
                throw new Exception("用户名已被注册");
            }
            Entity.User user = Utils.ChangeModel.signUpToUser(userInfo);
            Group group = new()
            {
                createTime = TimeUtils.GetNowTime(),
                type = GroupType.SELF,
                name = "我的素材"
            };

            Context.Group.Add(group);
            Context.User.Add(user);
            Context.SaveChanges();
            UserGroup userGroup = new()
            {
                groupId = group.id,
                userId = user.id,
                role = GroupRole.OWNER,
                joinTime = TimeUtils.GetNowTime()
            };
            Context.UserGroup.Add(userGroup);
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 用户登录
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string Login(LoginModel user)
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
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(JwtConfig.securityKey));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: JwtConfig.issuer,
                    audience: JwtConfig.audience,
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(60 * 24 * 7),
                    signingCredentials: creds);

                var jwtToken = new JwtSecurityTokenHandler().WriteToken(token);
                return jwtToken;
            }
            else
            {
                throw new Exception("账号或密码错误");
            }
        }
        /// <summary>
        /// 显示本人用户信息
        /// </summary>
        /// <returns></returns>
        public UserShowModel GetSelfInfo(int userID)
        {
            Entity.User user = Context.User.FirstOrDefault(x => x.id == userID);
            View_Group group = Context.View_Group.FirstOrDefault(x => x.userId == userID && x.type == GroupType.SELF);
            if (user != null && group != null)
            {
                return Utils.ChangeModel.userToShowModel(user, group.groupId);
            }
            else
            {
                throw new Exception("用户不存在");
            }
        }
        /// <summary>
        /// 显示用户信息
        /// </summary>
        /// <returns></returns>
        public UserShowModel GetUserInfo(int userId)
        {
            Entity.User user = Context.User.FirstOrDefault(x => x.id == userId);
            View_Group group = Context.View_Group.FirstOrDefault(x => x.userId == userId && x.type == GroupType.SELF);
            if (user != null && group != null)
            {
                return Utils.ChangeModel.userToShowModel(user, group.groupId);
            }
            else
            {
                throw new Exception("用户不存在");
            }
        }
        /// <summary>
        /// 编辑用户信息
        /// </summary>
        /// <param name="user"></param>
        /// <returns></returns>

        public bool EditUserInfo(UserEditModel user, int userID)
        {
            bool isNameHave = Context.User.ToList().Exists(x => x.nickname == user.nickname && x.id != userID);

            if (isNameHave)
            {
                throw new Exception("用户名已被注册");
            }
            Entity.User userT = Context.User.FirstOrDefault(x => x.id == userID);
            if (userT != null)
            {
                userT.nickname = user.nickname;
                userT.introduce = user.introduce;
                Context.SaveChanges();
                return true;
            }
            else
            {
                throw new Exception("用户不存在");
            }
        }
        /// <summary>
        /// 上传用户头像
        /// </summary>
        /// <param name="url"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool AvatarUpload(string url, int userId)
        {
            Entity.User user = Context.User.FirstOrDefault(x => x.id == userId);
            if (user != null)
            {
                user.avatar = url;
                Context.SaveChanges();
                return true;
            }
            else
            {
                throw new Exception("用户不存在");
            }
        }
        /// <summary>
        /// 上传用户头图
        /// </summary>
        /// <param name="url"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool BannerUpload(string url, int userId)
        {
            Entity.User user = Context.User.FirstOrDefault(x => x.id == userId);
            if (user != null)
            {
                user.banner = url;
                Context.SaveChanges();
                return true;
            }
            else
            {
                throw new Exception("用户不存在");
            }
        }
    }
}

