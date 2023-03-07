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
                return Ok(JsonUtils.ToJson(gameServices.CreateGame(gameCreateModel, userID)));
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
                return Ok(JsonUtils.ToJson(gameServices.EditGame(gameCreateModel, userID)));
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
        public IActionResult GetGamesOfUser(int position, int limit)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(gameServices.GetGameOfUser(userID, position, limit));
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
                return Ok(JsonUtils.ToJson(gameServices.GetCreateGameInfoById(userID, gameId)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取游戏推荐
        /// </summary>
        /// <param name="lastId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetRecommenderGameList(int lastId)
        {
            try
            {
                return Ok(JsonUtils.ToJson(gameServices.GetRecommenderGameList(lastId)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 搜索游戏
        /// </summary>
        /// <param name="searchContent"></param>
        /// <param name="position"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult SearchGame(string searchContent, int position, int limit = 12)
        {
            try
            {
                return Ok(gameServices.SearchGame(searchContent, position, limit));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 游戏发布
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="isPublish"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult GamePublish(int gameId, bool isPublish)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.GamePublish(userID, gameId, isPublish)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 删除游戏
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult DelGame(int gameId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.DelGame(userID, gameId)));
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
                addEventData.isStartEvent = false;
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
        /// <summary>
        /// 添加边
        /// </summary>
        /// <param name="newEdge"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult AddEdge(AddEdgeModel newEdge)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.AddEdge(newEdge, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 删除事件
        /// </summary>
        /// <param name="eventId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpDelete]
        [Authorize]
        public IActionResult DelEevent(int eventId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.DelEvent(eventId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 编辑事件
        /// </summary>
        /// <param name="eventEditData"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult EditEvent(EventEditModel eventEditData)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.EditEvent(eventEditData, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取台词
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="eventId"></param>
        /// <param name="lineId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetLines(int gameId, int eventId, int lineId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.GetLines(gameId, eventId, lineId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取事件所有的台词
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="eventId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetLinesListOfEvent(int gameId, int eventId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.GetLinesListOfEvent(gameId, eventId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 创建第一个台词
        /// </summary>
        /// <param name="newLines"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult CreateFirstLines(CreateLinesModel newLines)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.CreateFirstLines(newLines, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 插入台词
        /// </summary>
        /// <param name="newLines"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult InsertLines(CreateLinesModel newLines)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.InsertLines(newLines, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 删除台词
        /// </summary>
        /// <param name="linesId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpDelete]
        [Authorize]
        public IActionResult DelLines(int linesId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.DelLines(linesId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 编辑台词
        /// </summary>
        /// <param name="newLines"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult EditLines(CreateLinesModel newLines)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.EditLines(newLines, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 编辑绑定
        /// </summary>
        /// <param name="bingdingData"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult EditBinding(GameBinding bingdingData)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.EditBinding(bingdingData, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 绑定
        /// </summary>
        /// <param name="bingdingData"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult Binding(GameBindingModel bingdingData)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.Binding(bingdingData, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取绑定信息
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetBindingInfo(int gameId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.GetBindingInfo(gameId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 删除绑定
        /// </summary>
        /// <param name="bindingId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpDelete]
        [Authorize]
        public IActionResult DelBingding(int bindingId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.DelBinding(bindingId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取游戏游玩数据内容
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetGamePlayData(int gameId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.GetGamePlayData(gameId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取某个事件的选项
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetOptions(int eventId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.GetOptions(eventId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 获取某个游戏所有的选项
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpGet]
        [Authorize]
        public IActionResult GetOptionsOfgame(int gameId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.GetOptionsOfgame(gameId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 添加选项
        /// </summary>
        /// <param name="newOption"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult AddOption(OptionModel newOption)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.AddOption(newOption, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 编辑选项内容
        /// </summary>
        /// <param name="editOption"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpPost]
        [Authorize]
        public IActionResult EditOption(OptionModel editOption)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.EditOption(editOption, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        /// <summary>
        /// 删除选项
        /// </summary>
        /// <param name="optionId"></param>
        /// <returns></returns>
        [EnableCors("any")]
        [HttpDelete]
        [Authorize]
        public IActionResult DelOption(int optionId)
        {
            try
            {
                var auth = HttpContext.AuthenticateAsync();
                int userID = int.Parse(auth.Result.Principal.Claims.First(t => t.Type.Equals(ClaimTypes.Sid))?.Value);
                return Ok(JsonUtils.ToJson(gameServices.DelOption(optionId, userID)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
