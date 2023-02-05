using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Setting;
using GalConnection.Server.Utils;
using Microsoft.EntityFrameworkCore;
using static GalConnection.Model.EventAddModel;

namespace GalConnection.Server.Services
{
    public class GameServices
    {
        readonly GalConnectionContext Context;
        public GameServices(GalConnectionContext context)
        {
            Context = context;
        }
        /// <summary>
        /// 通过id获取游戏信息
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Game GetGameInfoById(int gameId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game != null)
            {
                return game;
            }
            else
            {
                throw new Exception("游戏不存在");
            }
        }
        /// <summary>
        /// 根据用户获取发布的游戏
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Game> GetGameByUser(int userId)
        {
            List<Game> game = Context.Game.Where(x => x.userId == userId && x.state == GameState.PUBLISH).ToList();
            return game;
        }
        /// <summary>
        /// 获取用户创建的游戏
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Game> GetGameOfUser(int userId)
        {
            List<Game> game = Context.Game.Where(x => x.userId == userId && x.state != GameState.DELETE).ToList();
            return game;
        }
        /// <summary>
        /// 根据id获取游戏创建信息
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public GameInfoModel GetCreateGameInfoById(int userId, int gameId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.userId == userId && x.state != GameState.DELETE && x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在或你没有对应权限");
            }
            GameInfoModel gameInfo = new()
            {
                id = game.id,
                userId = game.userId,
                gameName = game.gameName,
                tag = game.tag.Split(","),
                cover = game.cover,
                homeBg = game.homeBg,
                preCG = game.preCG.Split(","),
                langeuage = game.langeuage.Split(","),
                introduce = game.introduce
            };
            return gameInfo;
        }
        /// <summary>
        /// 获取游戏游玩数据内容
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public GamePlayModel getGamePlayData(int gameId)
        {
            List<Event> events = Context.Event.Where(x => x.gameId == gameId).ToList();
            List<Lines> lines = Context.Lines.Where(x => events.Exists(y => y.id == x.eventId)).ToList();
            List<Option> options = Context.Option.Where(x => events.Exists(y => y.id == x.eventId)).ToList();
            GamePlayModel gamePlayModel = new()
            {
                lines = lines,
                options = options,
                events = events
            };
            return gamePlayModel;
        }
        /// <summary>
        /// 创建事件
        /// </summary>
        /// <param name="createEvent"></param>
        /// <returns></returns>
        public int createEvent(CreateEventModel createEvent)
        {
            Event gameEvent = new()
            {
                gameId = createEvent.gameId,
                eventName = createEvent.eventName,
                pid = createEvent.pid,
                endType = createEvent.endType,
                enterCondition = createEvent.enterCondition
            };
            Context.Event.Add(gameEvent);
            Context.SaveChanges();
            Context.Entry(gameEvent);
            return gameEvent.id;
        }
        /// <summary>
        /// 创建游戏
        /// </summary>
        /// <param name="createGame"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int CreateGame(GameCreateModel createGame, int userId)
        {
            Game game = new()
            {
                userId = userId,
                tag = string.Join(",", createGame.tag),
                cover = createGame.cover,
                homeBg = createGame.homeBg,
                preCG = string.Join(',', createGame.preCG),
                langeuage = string.Join(",", createGame.langeuage),
                introduce = createGame.introduce,
                state = GameState.DEVELOPMENT,
                gameName = createGame.gameName,
            };
            Context.Game.Add(game);
            Context.SaveChanges();
            EventAddModel eventAdd = new()
            {
                gameId = game.id,
                eventName = "初始事件",
                pid = 0,
                eventTreeViewData = new EventTreeViewDataAddModel() { position = "{\"x\":0,\"y\":50}" }
            };
            AddEvent(eventAdd, userId);
            return game.id;
        }
        /// <summary>
        /// 编辑游戏创建信息
        /// </summary>
        /// <param name="createGame"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int EditGame(GameCreateModel newGameInfo, int userId)
        {
            Game gameInfo = Context.Game.FirstOrDefault(x => x.state != GameState.DELETE && x.id == newGameInfo.id && x.userId == userId);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在或你没有对应权限");
            }
            gameInfo.tag = string.Join(",", newGameInfo.tag);
            gameInfo.cover = newGameInfo.cover;
            gameInfo.homeBg = newGameInfo.homeBg;
            gameInfo.preCG = string.Join(',', newGameInfo.preCG);
            gameInfo.langeuage = string.Join(",", newGameInfo.langeuage);
            gameInfo.introduce = newGameInfo.introduce;
            gameInfo.gameName = newGameInfo.gameName;
            Context.SaveChanges();
            return gameInfo.id;
        }
        /// <summary>
        /// 添加事件
        /// </summary>
        /// <param name="addEvent"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Event AddEvent(EventAddModel addEvent, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == addEvent.gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (game.userId != userId)
            {
                throw new Exception("无权限");
            }
            Event newEvent = new Event()
            {
                gameId = game.id,
                eventName = addEvent.eventName,
                pid = addEvent.pid,
                endType = (int)EventEndType.NEXT,
                enterCondition = "",
                EventTreeViewData = new() { position = addEvent.eventTreeViewData.position }
            };
            Context.Event.Add(newEvent);
            Context.SaveChanges();
            return newEvent;
        }
        /// <summary>
        /// 获取事件列表
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Event> GetEventList(int gameId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (game.userId != userId)
            {
                throw new Exception("无权限");
            }
            List<Event> events = Context.Event.Include(x => x.EventTreeViewData).Where(x => x.gameId == gameId).ToList();
            return events;
        }
        /// <summary>
        /// 编辑事件在树视图中位置
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public string EditEventPosition(EditEventPositionModel editEventPositionModel, int userId)
        {
            Event eventIn = Context.Event.Include(x => x.EventTreeViewData).FirstOrDefault(x => x.id == editEventPositionModel.eventId);
            if (eventIn == null)
            {
                throw new Exception("事件不存在");
            }
            Game game = Context.Game.FirstOrDefault(x => x.id == eventIn.gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (game.userId != userId)
            {
                throw new Exception("无权限");
            }
            eventIn.EventTreeViewData.position = editEventPositionModel.position;
            Context.SaveChanges();
            return editEventPositionModel.position;
        }
    }
}
