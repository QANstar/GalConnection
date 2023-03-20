using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Hubs;
using GalConnection.Server.Setting;
using GalConnection.Server.Utils;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;

namespace GalConnection.Server.Services
{
    public class ChatServices
    {
        readonly GalConnectionContext Context;
        public ChatServices(GalConnectionContext context)
        {
            Context = context;
        }
        /// <summary>
        /// 获取用户所有的聊天房间
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<ChatRoomOfUser> GetAllChatRoomsOfUser(int userId)
        {
            List<ChatRoom> rooms = Context.ChatRoom.Include(x => x.ChatRoomUsers).ThenInclude(x => x.user).Where(x => x.ChatRoomUsers.FirstOrDefault(y => y.userId == userId) != null).ToList();
            List<ChatRoomOfUser> chatRoomOfUsers = new List<ChatRoomOfUser>();
            rooms.ForEach(room =>
            {
                ChatRoomOfUser item = new(room)
                {
                    unReadNum = Context.ChatContentState.Include(x => x.chatContent).Where(x => !x.isRead && x.chatContent.roomId == room.id).Count()
                };
                chatRoomOfUsers.Add(item);
            });
            return chatRoomOfUsers;
        }
        /// <summary>
        /// 创建新聊天室
        /// </summary>
        /// <param name="firstUserId"></param>
        /// <param name="secondUserId"></param>
        /// <returns></returns>
        public ChatRoom CreateChatRoom(int firstUserId, int secondUserId)
        {
            ChatRoom newChatRoom = new()
            {
                createTime = TimeUtils.GetNowTime(),
                isGroup = false,
                ChatRoomUsers = new List<ChatRoomUsers>
                {
                    new ChatRoomUsers()
                    {
                        userId= firstUserId,
                        jionTime= TimeUtils.GetNowTime()
                    },
                      new ChatRoomUsers()
                    {
                        userId= secondUserId,
                        jionTime= TimeUtils.GetNowTime()
                    },
                }
            };

            Context.ChatRoom.Add(newChatRoom);
            Context.SaveChanges();

            return newChatRoom;
        }
        /// <summary>
        /// 获取指定两个用户的聊天室
        /// </summary>
        /// <param name="firstUserId"></param>
        /// <param name="secondUserId"></param>
        /// <returns></returns>
        public ChatRoomOfUser GetChatRoomByUserId(int firstUserId, int secondUserId)
        {
            ChatRoom chatRoom = Context.ChatRoom.Include(x => x.ChatRoomUsers).ThenInclude(x => x.user).FirstOrDefault(x => x.ChatRoomUsers.FirstOrDefault(y => y.userId == firstUserId) != null && x.ChatRoomUsers.FirstOrDefault(y => y.userId == secondUserId) != null && !x.isGroup);
            if (chatRoom == null)
            {
                chatRoom = Context.ChatRoom.Include(x => x.ChatRoomUsers).ThenInclude(x => x.user).FirstOrDefault(x => x.id == CreateChatRoom(firstUserId, secondUserId).id);
            }
            ChatRoomOfUser item = new(chatRoom)
            {
                unReadNum = Context.ChatContentState.Include(x => x.chatContent).Where(x => !x.isRead && x.chatContent.roomId == chatRoom.id).Count()
            };
            return item;
        }
    }
}
