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
        public Task SendPrivateMessage(string user, string message)
        {
            return Clients.User(user).SendAsync("ReceiveMessage", message);
        }
        public async Task NewMessage(long username, string message) => await Clients.All.SendAsync("messageReceived", "21365");

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
