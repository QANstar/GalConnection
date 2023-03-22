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

        public static UserShowModel userToShowModel(User x, int groupId, bool isFollow, int followCount, int fansCount)
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
                isFollow = isFollow,
                fansCount = fansCount,
                followCount = followCount
            };
        }

        public static UserSimpleInfoModel UserToSimpleInfoModel(User x)
        {
            return new UserSimpleInfoModel()
            {
                id = x.id,
                email = x.email,
                nickname = x.nickname,
                avatar = x.avatar,
                createdAt = x.createdAt,
                introduce = x.introduce,
                banner = x.banner,
            };
        }

        public static ChatContentStateModel ChatContentStateToShowModel(ChatContentState state)
        {
            return new ChatContentStateModel()
            {
                id = state.id,
                userId = state.userId,
                isRead = state.isRead,
            };
        }

        public static ChatContentsModel ChatToShowModel(ChatContent chat)
        {
            return new ChatContentsModel()
            {
                id = chat.id,
                userId = chat.userId,
                roomId = chat.roomId,
                words = chat.words,
                createTime = chat.createTime,
                user = UserToSimpleInfoModel(chat.user),
                ChatContentState = chat.ChatContentState.Select(x => ChatContentStateToShowModel(x)).ToList(),
            };
        }
    }
}
