using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Services;
using GalConnection.Server.Utils;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Security.Claims;

namespace GalConnection.Server.Hubs
{
    [Authorize]
    public class ChatHub : Hub
    {
        readonly GalConnectionContext DbContext;
        readonly ChatServices chatServices;
        public ChatHub(GalConnectionContext context)
        {
            DbContext = context;
            chatServices = new ChatServices(context);
        }
        public async Task NewMessage(long username, string message) => await Clients.All.SendAsync("messageReceived", "21365");
        /// <summary>
        /// 加入聊天室
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task JoinRoom(int roomId)
        {
            if (Context.UserIdentifier == null)
            {
                return;
            }
            if (chatServices.IsRoomMember(int.Parse(Context.UserIdentifier), roomId))
            {
                string groupName = roomId.ToString();
                await Groups.AddToGroupAsync(Context.ConnectionId, groupName);
                await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has joined the group {groupName}.");
            }
        }
        /// <summary>
        /// 离开房间
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        public async Task ExitRoom(int roomId)
        {
            if (Context.UserIdentifier == null)
            {
                return;
            }
            if (chatServices.IsRoomMember(int.Parse(Context.UserIdentifier), roomId))
            {
                string groupName = roomId.ToString();
                await Groups.RemoveFromGroupAsync(Context.ConnectionId, groupName);
                await Clients.Group(groupName).SendAsync("Send", $"{Context.ConnectionId} has exit the group {groupName}.");
            }
        }
        /// <summary>
        /// 添加聊天
        /// </summary>
        /// <param name="chatAdd"></param>
        /// <returns></returns>
        public async Task AddChat(ChatAddModel chatAdd)
        {
            int userId = int.Parse(Context.UserIdentifier);
            string groupName = chatAdd.roomId.ToString();
            try
            {
                ChatContentsModel chat = chatServices.AddChat(chatAdd, userId);
                await Clients.Group(groupName).SendAsync("GetChatMessage", JsonUtils.ToJson(chat));
            }
            catch (Exception ex)
            {
                await Clients.Group(groupName).SendAsync("ChatErr", ex.Message);
            }
        }


        public override async Task OnConnectedAsync()
        {
            await Clients.All.SendAsync("messageReceived", Context.UserIdentifier);
        }

        public override Task OnDisconnectedAsync(Exception? exception)
        {
            return base.OnDisconnectedAsync(exception);
        }
    }
}
