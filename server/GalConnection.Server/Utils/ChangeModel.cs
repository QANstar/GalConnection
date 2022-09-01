using GalConnection.Entity;
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
                avatar = "",
                banner = "",
                introduce = "",
                createdAt = (DateTime.Now.Ticks - new DateTime(1970, 1, 1, 0, 0, 0, 0).Ticks) / 10000
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
                createdAt = x.createdAt,
                introduce = x.introduce,
                banner = x.banner
            };
        }
    }
}
