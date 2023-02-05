using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Services;
using GalConnection.Server.Utils;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace GalConnection.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GameController : Controller
    {
        readonly GalConnectionContext Context;
        readonly GameServices gameServices;
        public GameController(GalConnectionContext context)
        {
            Context = context;
            gameServices = new GameServices(context);
        }
        /// <summary>
        /// 创建游戏
        /// </summary>
        /// <param name="gameCreateModel"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult CreateGame(GameCreateModel gameCreateModel)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(gameServices.CreateGame(gameCreateModel, userID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 编辑游戏
        /// </summary>
        /// <param name="gameCreateModel"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult EditGame(GameCreateModel gameCreateModel)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(gameServices.EditGame(gameCreateModel, userID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取用户创建的游戏
        /// </summary>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetGamesOfUser()
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(gameServices.GetGameOfUser(userID));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 通过游戏id获取创建游戏信息
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetCreateGamesInfoById(int gameId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(gameServices.GetCreateGameInfoById(userID, gameId));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 添加事件
        /// </summary>
        /// <param name="addEventData"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult AddEvent(EventAddModel addEventData)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.AddEvent(addEventData, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取事件列表
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetEventList(int gameId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.GetEventList(gameId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 编辑事件在树视图中位置
        /// </summary>
        /// <param name="editEventPositionModel"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult EditEventPosition(EditEventPositionModel editEventPositionModel)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.EditEventPosition(editEventPositionModel, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
