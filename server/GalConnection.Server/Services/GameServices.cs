using GalConnection.Entity;
using GalConnection.Model;

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
        /// 根据用户获取游戏
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Game> GetGameByUser(int userId)
        {
            List<Game> game = Context.Game.Where(x => x.userId == userId).ToList();
            return game;
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
    }
}
