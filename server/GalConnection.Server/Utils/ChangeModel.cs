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
                createdAt = TimeUtils.GetNowTime()
            };
        }

        public static UserShowModel userToShowModel(User x, int groupId, bool isFollow)
        {
            return new UserShowModel()
            {
                id = x.id,
                email = x.email,
                nickname = x.nickname,
                avatar = x.avatar,
                createdAt = x.createdAt,
                introduce = x.introduce,
                banner = x.banner,
                groupId = groupId,
                isFollow = isFollow
            };
        }
    }
}
