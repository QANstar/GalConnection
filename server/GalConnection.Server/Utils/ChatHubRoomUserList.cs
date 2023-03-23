using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GalConnection.Server.Utils
{
    public class ChatHubRoomUserList
    {
        public static List<ChatHubRoomUser> RoomUserList = new List<ChatHubRoomUser>();

        public static void AddUser(int userId, int roomId)
        {
            if (!RoomUserList.Exists(x => x.userId == userId && x.roomId == roomId))
            {
                RoomUserList.Add(new ChatHubRoomUser()
                {
                    userId = userId,
                    roomId = roomId
                });
            }
        }

        public static void RemoveRoomUser(int userId, int roomId)
        {
            RoomUserList.RemoveAll(x => x.userId == userId && x.roomId == roomId);
        }

        public static void RemoveAllUser(int userId)
        {
            RoomUserList.RemoveAll(x => x.userId == userId);
        }

        public static List<int> GetRoomUsers(int roomId)
        {
            return RoomUserList.Where(x => x.roomId == roomId).Select(x => x.userId).ToList();
        }
    }

    public class ChatHubRoomUser
    {
        public int roomId { get; set; }
        public int userId { get; set; }
    }
}
