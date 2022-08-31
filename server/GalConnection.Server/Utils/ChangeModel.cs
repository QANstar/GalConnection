﻿using GalConnection.Entity;
using GalConnection.Model;

namespace GalConnection.Server.Utils
{
    public class ChangeModel
    {
        public static User signUpToUser(SignUpModel x)
        {
            return new User()
            {
                email = x.email,
                password = x.password,
                nickname = x.nickname,
            };
        }

        public static UserShowModel userToShowModel(User x)
        {
            return new UserShowModel()
            {
                id = x.id,
                email = x.email,
                nickname = x.nickname,
                avatar = x.avatar,
            };
        }
    }
}
