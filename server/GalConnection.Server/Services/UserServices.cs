﻿using Microsoft.IdentityModel.Tokens;
using GalConnection.Entity;
using GalConnection.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

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
            Context.User.Add(user);
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
                var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("QANstarAndSuoMi1931"));
                var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                    issuer: "QANstar",
                    audience: "QANstar",
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
            if (user != null)
            {
                return Utils.ChangeModel.userToShowModel(user);
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
        public UserShowModel GetUserInfo(string nickname)
        {
            Entity.User user = Context.User.FirstOrDefault(x => x.nickname == nickname);
            if (user != null)
            {
                return Utils.ChangeModel.userToShowModel(user);
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

        public bool EditUserInfo(UserShowModel user, int userID)
        {
            bool isEmailHave = Context.User.ToList().Exists(x => x.email == user.email && x.id != userID);
            bool isNameHave = Context.User.ToList().Exists(x => x.nickname == user.nickname && x.id != userID);
            if (isEmailHave)
            {
                throw new Exception("邮箱已被注册");
            }
            if (isNameHave)
            {
                throw new Exception("用户名已被注册");
            }
            Entity.User userT = Context.User.FirstOrDefault(x => x.id == userID);
            if (userT != null)
            {
                userT.nickname = user.nickname;
                userT.avatar = user.avatar;
                userT.email = user.email;
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
