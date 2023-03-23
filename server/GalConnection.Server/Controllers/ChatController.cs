using GalConnection.Entity;
using GalConnection.Server.Hubs;
using GalConnection.Server.Services;
using GalConnection.Server.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System.Security.Claims;

namespace GalConnection.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ChatController : Controller
    {
        readonly GalConnectionContext Context;
        readonly ChatServices chatServices;

        public ChatController(GalConnectionContext context, IHubContext<ChatHub> _hubContext)
        {
            Context = context;
            chatServices = new ChatServices(context, _hubContext);
        }

        /// <summary>
        /// 获取用户所有的聊天房间
        /// </summary>
        /// <param name="position"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetAllChatRoomsOfUser()
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(chatServices.GetAllChatRoomsOfUser(userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取指定两个用户的聊天室
        /// </summary>
        /// <param name="targetUserId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetChatRoomByUserId(int targetUserId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(chatServices.GetChatRoomByUserId(userID, targetUserId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取聊天内容列表
        /// </summary>
        /// <param name="roomId"></param>
        /// <param name="nextId"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetChatContentList(int roomId, int nextId, int limit = 10)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(chatServices.GetChatContentList(roomId, userID, nextId, limit));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取未读数量
        /// </summary>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetUnReadNum()
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(chatServices.GetUnReadNum(userID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 已读所有
        /// </summary>
        /// <param name="roomId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult ReadAll(int roomId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(chatServices.ReadAll(userID, roomId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
