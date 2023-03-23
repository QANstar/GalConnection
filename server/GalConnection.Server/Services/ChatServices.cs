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
        readonly IHubContext<ChatHub> hubContext;
        readonly GalConnectionContext Context;
        public ChatServices(GalConnectionContext context, IHubContext<ChatHub> _hubContext)
        {
            Context = context;
            hubContext = _hubContext;
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
                    unReadNum = Context.ChatContentState.Include(x => x.chatContent).Where(x => !x.isRead && x.chatContent.roomId == room.id && x.userId == userId).Count()
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
        public ChatRoomOfUser GetChatRoomByUserId(int firstUserId, int secondUserId, int userId)
        {
            ChatRoom chatRoom = Context.ChatRoom.Include(x => x.ChatRoomUsers).ThenInclude(x => x.user).FirstOrDefault(x => x.ChatRoomUsers.FirstOrDefault(y => y.userId == firstUserId) != null && x.ChatRoomUsers.FirstOrDefault(y => y.userId == secondUserId) != null && !x.isGroup);
            if (chatRoom == null)
            {
                chatRoom = Context.ChatRoom.Include(x => x.ChatRoomUsers).ThenInclude(x => x.user).FirstOrDefault(x => x.id == CreateChatRoom(firstUserId, secondUserId).id);
            }
            ChatRoomOfUser item = new(chatRoom)
            {
                unReadNum = Context.ChatContentState.Include(x => x.chatContent).Where(x => !x.isRead && x.chatContent.roomId == chatRoom.id && x.userId == userId).Count()
            };
            return item;
        }
        /// <summary>
        /// 检查是否是聊天时成员
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public bool IsRoomMember(int userId, int roomId)
        {
            ChatRoom chatRoom = Context.ChatRoom.Include(x => x.ChatRoomUsers).FirstOrDefault(x => x.id == roomId);
            if (chatRoom == null)
            {
                return false;
            }
            if (chatRoom.ChatRoomUsers.ToList().Exists(x => x.userId == userId))
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// 添加聊天信息
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public ChatContentsModel AddChat(ChatAddModel chatAdd, int userId, List<int> inRoomUser)
        {

            ChatRoom chatRoom = Context.ChatRoom.Include(x => x.ChatRoomUsers).FirstOrDefault(x => x.id == chatAdd.roomId);
            if (chatRoom == null)
            {
                throw new Exception("聊天室不存在");
            }
            if (!IsRoomMember(userId, chatRoom.id))
            {
                throw new Exception("不是聊天室成员");
            }
            ChatContent newChat = new()
            {
                userId = userId,
                roomId = chatRoom.id,
                words = chatAdd.words,
                createTime = TimeUtils.GetNowTime(),
                ChatContentState = chatRoom.ChatRoomUsers.Select(x => new ChatContentState()
                {
                    userId = x.userId,
                    isRead = x.userId == userId || inRoomUser.Exists(y => x.userId == y),
                }).ToList()
            };
            chatRoom.lastWords = newChat.words;
            chatRoom.lastWordsTime = newChat.createTime;
            Context.ChatContent.Add(newChat);
            Context.SaveChanges();
            ChatContent chat = Context.ChatContent.Include(x => x.ChatContentState).Include(x => x.user).FirstOrDefault(x => x.id == newChat.id);
            if (chat == null)
            {
                throw new Exception("内容不存在");
            }
            ChatContentsModel resChat = Utils.ChangeModel.ChatToShowModel(chat);
            chatRoom.ChatRoomUsers.ToList().ForEach(x =>
            {
                GetUnReadNum(x.userId);
                GetChatRoomOfUser(resChat.roomId, x.userId);
            });
            return resChat;
        }
        /// <summary>
        /// 获取聊天内容列表
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string GetChatContentList(int roomId, int userId, int nextId, int limit = 10)
        {
            ChatRoom chatRoom = Context.ChatRoom.FirstOrDefault(x => x.id == roomId);
            if (chatRoom == null)
            {
                throw new Exception("聊天室不存在");
            }
            if (!IsRoomMember(userId, roomId))
            {
                throw new Exception("不是聊天室成员");
            }
            List<ChatContent> messages = Context.ChatContent.OrderByDescending(x => x.createTime).Where(x => x.roomId == roomId && (nextId == 0 || x.id < nextId)).Include(x => x.ChatContentState).Include(x => x.user).Take(limit).OrderBy(x => x.createTime).ToList();
            List<ChatContentsModel> chatContents = messages.Select(x => Utils.ChangeModel.ChatToShowModel(x)).ToList();
            var res = new
            {
                messages = chatContents,
                hasNext = Context.ChatContent.OrderByDescending(x => x.createTime).Where(x => x.roomId == roomId && (nextId == 0 || x.id < nextId)).Count() > limit
            };
            return JsonUtils.ToJson(res);
        }

        /// <summary>
        /// 获取未读数量
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int GetUnReadNum(int userId)
        {
            int num = Context.ChatContentState.Where(x => x.userId == userId && !x.isRead).Count();
            hubContext.Clients.User(userId.ToString()).SendAsync("GetUnReadNum", num);
            return num;
        }
        /// <summary>
        /// 已读所有
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public bool ReadAll(int userId, int roomId)
        {
            List<ChatContentState> states = Context.ChatContentState.Include(x => x.chatContent).Where(x => x.userId == userId && !x.isRead && x.chatContent.roomId == roomId).ToList();
            states.ForEach(item =>
            {
                item.isRead = true;
            });
            Context.SaveChanges();
            GetUnReadNum(userId);
            GetChatRoomOfUser(roomId, userId);
            return true;
        }
        /// <summary>
        /// 获取指定的聊天室用户信息
        /// </summary>
        /// <returns></returns>
        public ChatRoomOfUser GetChatRoomOfUser(int roomId, int userId)
        {
            ChatRoom chatRoom = Context.ChatRoom.Include(x => x.ChatRoomUsers).ThenInclude(x => x.user).FirstOrDefault(x => x.id == roomId);
            if (chatRoom == null)
            {
                throw new Exception("房间不存在");
            }
            ChatRoomOfUser item = new(chatRoom)
            {
                unReadNum = Context.ChatContentState.Include(x => x.chatContent).Where(x => !x.isRead && x.chatContent.roomId == chatRoom.id && x.userId == userId).Count()
            };
            hubContext.Clients.User(userId.ToString()).SendAsync("GetChatRoomOfUser", JsonUtils.ToJson(item));
            return item;
        }
    }
}
