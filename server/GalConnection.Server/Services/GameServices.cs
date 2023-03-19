using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Hubs;
using GalConnection.Server.Setting;
using GalConnection.Server.Utils;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Text.RegularExpressions;
using static GalConnection.Model.CreateLinesModel;
using static GalConnection.Model.EventAddModel;

namespace GalConnection.Server.Services
{
    public class GameServices
    {
        readonly GroupServices groupServices;
        readonly NotificationServices notificationServices;
        readonly GalConnectionContext Context;
        public GameServices(GalConnectionContext context, IHubContext<ChatHub> _hubContext)
        {
            Context = context;
            groupServices = new GroupServices(context);
            notificationServices = new NotificationServices(context, _hubContext);
        }
        /// <summary>
        /// 通过id获取游戏信息
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public GameUserViewModel GetGameInfoById(int gameId, int useId)
        {
            Game game = Context.Game.Include(x => x.user).Include(x => x.Tag).FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            GameUserViewModel gameUserView = (GameUserViewModel)game;
            if (Context.Star.FirstOrDefault(x => x.gameId == gameId && x.userId == useId) != null)
            {
                gameUserView.isStar = true;
            }
            if (Context.Like.FirstOrDefault(x => x.gameId == gameId && x.userId == useId) != null)
            {
                gameUserView.isLike = true;
            }
            return gameUserView;
        }
        /// <summary>
        /// 根据用户获取发布的游戏
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public List<Game> GetGameByUser(int userId)
        {
            List<Game> game = Context.Game.Include(x => x.user).Include(x => x.Tag).Where(x => x.userId == userId && x.state == GameState.PUBLISH).ToList();
            return game;
        }
        /// <summary>
        /// 获取用户创建的游戏
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        public string GetGameOfUser(int userId, int position, int limit)
        {
            List<Game> games = Context.Game.Include(x => x.user).Include(x => x.Tag).Where(x => x.userId == userId && x.state != GameState.DELETE).OrderByDescending(x => x.createdAt).Skip(position).Take(limit).ToList();
            var res = new
            {
                games,
                total = Context.Game.Include(x => x.user).Include(x => x.Tag).Where(x => x.userId == userId && x.state != GameState.DELETE).Count()
            };
            return JsonUtils.ToJson(res);
        }
        /// <summary>
        /// 获取用户发布的游戏
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="position"></param>
        /// <param name="limit"></param>
        /// <returns></returns>
        public string GetGameOfUserPublish(int userId, int position, int limit)
        {
            List<Game> games = Context.Game.Include(x => x.user).Include(x => x.Tag).Where(x => x.userId == userId && x.state == GameState.PUBLISH).OrderByDescending(x => x.createdAt).Skip(position).Take(limit).ToList();
            var res = new
            {
                games,
                total = Context.Game.Include(x => x.user).Include(x => x.Tag).Where(x => x.userId == userId && x.state == GameState.PUBLISH).Count()
            };
            return JsonUtils.ToJson(res);
        }
        /// <summary>
        /// 根据id获取游戏创建信息
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public GameInfoModel GetCreateGameInfoById(int userId, int gameId)
        {
            Game game = Context.Game.Include(x => x.user).Include(x => x.Tag).FirstOrDefault(x => x.state != GameState.DELETE && x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(game.groupId, userId, GroupRole.READER) && game.state != GameState.PUBLISH)
            {
                throw new Exception("无权限");
            }
            GameInfoModel gameInfo = new()
            {
                id = game.id,
                userId = game.userId,
                gameName = game.gameName,
                cover = game.cover,
                homeBg = game.homeBg,
                preCG = game.preCG.Split(","),
                langeuage = game.langeuage.Split(","),
                voiceLangeuage = game.voiceLangeuage.Split(","),
                introduce = game.introduce,
                groupId = game.groupId,
                Tag = game.Tag,
                state = game.state,
                createdAt = game.createdAt,
                playNum = game.playNum,
                starNum = game.starNum,
                likeNum = game.likeNum,
                isLike = Context.Like.FirstOrDefault(x => x.gameId == gameId && x.userId == userId) != null,
                isStar = Context.Star.FirstOrDefault(x => x.gameId == gameId && x.userId == userId) != null
            };
            return gameInfo;
        }
        /// <summary>
        /// 获取游戏游玩数据内容
        /// </summary>
        /// <param name="gameId"></param>
        /// <returns></returns>
        public GamePlayModel GetGamePlayData(int gameId, int userId)
        {
            Game game = Context.Game.Include(x => x.Tag).FirstOrDefault(x => x.state != GameState.DELETE && x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(game.groupId, userId, GroupRole.READER) && game.state != GameState.PUBLISH)
            {
                throw new Exception("无权限");
            }
            List<Event> events = Context.Event.Include(x => x.EventTreeViewData).Where(x => x.gameId == gameId).ToList();
            List<EventsMap> edges = Context.EventsMap.Where(x => x.gameId == gameId).ToList();
            List<Lines> lines = Context.Lines.Include(x => x.LinesBgm).Include(x => x.LinesBackground).Include(x => x.LinesChara).Include(x => x.LinesContent).Include(x => x.LinesVoice).Where(x => x.gameId == gameId).ToList();
            List<Option> options = Context.Option.Where(x => x.gameId == gameId).ToList();
            List<UserSave> saves = Context.UserSave.Where(x => x.gameId == gameId && x.userId == userId).ToList();
            GamePlayModel gamePlayModel = new()
            {
                lines = lines,
                edges = edges,
                options = options,
                events = events,
                saves = saves
            };
            return gamePlayModel;
        }
        /// <summary>
        /// 创建游戏
        /// </summary>
        /// <param name="createGame"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public int CreateGame(GameCreateModel createGame, int userId)
        {
            if (!groupServices.CheckRole(createGame.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            Game game = new()
            {
                userId = userId,
                tag = string.Join(",", createGame.tag),
                cover = createGame.cover,
                homeBg = createGame.homeBg,
                preCG = string.Join(',', createGame.preCG),
                langeuage = createGame.langeuage.Length > 0 ? string.Join(",", createGame.langeuage) : "中文",
                voiceLangeuage = createGame.voiceLangeuage.Length > 0 ? string.Join(",", createGame.voiceLangeuage) : "日文",
                introduce = createGame.introduce,
                state = GameState.DEVELOPMENT,
                gameName = createGame.gameName,
                groupId = createGame.groupId,
                Tag = createGame.tag.Select(x => new Tag()
                {
                    tag1 = x,
                }).ToList(),
                createdAt = TimeUtils.GetNowTime()
            };
            Context.Game.Add(game);
            Context.SaveChanges();
            EventAddModel eventAdd = new()
            {
                gameId = game.id,
                eventName = "初始事件",
                eventTreeViewData = new EventTreeViewDataAddModel() { position = "{\"x\":0,\"y\":50}" },
                isStartEvent = true,
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
            Game gameInfo = Context.Game.Include(x => x.Tag).FirstOrDefault(x => x.state != GameState.DELETE && x.id == newGameInfo.id);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(gameInfo.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            gameInfo.tag = string.Join(",", newGameInfo.tag);
            gameInfo.cover = newGameInfo.cover;
            gameInfo.homeBg = newGameInfo.homeBg;
            gameInfo.preCG = string.Join(',', newGameInfo.preCG);
            gameInfo.langeuage = newGameInfo.langeuage.Length > 0 ? string.Join(",", newGameInfo.langeuage) : "中文";
            gameInfo.voiceLangeuage = newGameInfo.langeuage.Length > 0 ? string.Join(",", newGameInfo.voiceLangeuage) : "日文";
            gameInfo.introduce = newGameInfo.introduce;
            gameInfo.gameName = newGameInfo.gameName;
            gameInfo.Tag = newGameInfo.tag.Select(x => new Tag()
            {
                tag1 = x,
            }).ToList();
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
        public AddEventResponseModel AddEvent(EventAddModel addEvent, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == addEvent.gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(game.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            Event newEvent = new Event()
            {
                gameId = game.id,
                eventName = addEvent.eventName,
                endType = (int)EventEndType.NEXT,
                enterCondition = "",
                isStartEvent = (bool)(addEvent.isStartEvent != null ? addEvent.isStartEvent : false),
                EventTreeViewData = new() { position = addEvent.eventTreeViewData.position },
                state = EventState.EXIST,
                groupId = game.groupId,
            };
            Context.Event.Add(newEvent);
            Context.SaveChanges();
            EventsMap eventsMap = null;
            if (addEvent.edge != null)
            {
                eventsMap = new()
                {
                    source = addEvent.edge.source,
                    target = newEvent.id,
                    gameId = game.id,
                    groupId = game.groupId,
                };
                Context.EventsMap.Add(eventsMap);
                Context.SaveChanges();
            }
            AddEventResponseModel addEventResponseModel = new()
            {
                eventShow = newEvent,
                edge = eventsMap
            };

            return addEventResponseModel;
        }
        /// <summary>
        /// 获取游戏推荐
        /// </summary>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<Game> GetRecommenderGameList(int lastId)
        {
            List<Game> games = Context.Game.Include(x => x.user).Where(x => x.id > lastId && x.state == GameState.PUBLISH).Take(10).ToList();
            return games;
        }
        /// <summary>
        /// 搜索游戏
        /// </summary>
        /// <param name="searchContent"></param>
        /// <returns></returns>
        public string SearchGame(string searchContent, int position, int limit)
        {
            List<Game> games = Context.Game.Include(x => x.user).Where(x => (x.gameName.Contains(searchContent) || x.tag.Contains(searchContent) || x.id.ToString() == searchContent) && x.state == GameState.PUBLISH).Skip(position).Take(limit).ToList();
            var res = new
            {
                games,
                total = Context.Game.Include(x => x.user).Where(x => (x.gameName.Contains(searchContent) || x.tag.Contains(searchContent) || x.id.ToString() == searchContent) && x.state == GameState.PUBLISH).Count()
            };

            return JsonUtils.ToJson(res);
        }
        /// <summary>
        /// 游戏发布
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="state"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool GamePublish(int userId, int gameId, bool isPublish)
        {
            Game gameInfo = Context.Game.Include(x => x.Tag).FirstOrDefault(x => x.state != GameState.DELETE && x.id == gameId);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(gameInfo.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            if (isPublish)
            {
                gameInfo.state = GameState.PUBLISH;
            }
            else
            {
                gameInfo.state = GameState.DEVELOPMENT;
            }
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 删除游戏
        /// </summary>
        /// <param name="userId"></param>
        /// <param name="gameId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool DelGame(int userId, int gameId)
        {
            Game gameInfo = Context.Game.Include(x => x.Tag).FirstOrDefault(x => x.state != GameState.DELETE && x.id == gameId);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(gameInfo.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            gameInfo.state = GameState.DELETE;
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 获取事件列表
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public EventShowModel GetEventList(int gameId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(game.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
            }
            List<Event> events = Context.Event.Include(x => x.EventTreeViewData).Where(x => x.gameId == gameId && x.state != EventState.DELETE).ToList();
            List<EventsMap> edges = Context.EventsMap.Where(x => x.gameId == gameId).ToList();
            EventShowModel eventShow = new()
            {
                events = events,
                edges = edges,
            };
            return eventShow;
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
            if (!groupServices.CheckRole(game.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            eventIn.EventTreeViewData.position = editEventPositionModel.position;
            Context.SaveChanges();
            return editEventPositionModel.position;
        }
        /// <summary>
        /// 添加边
        /// </summary>
        /// <param name="newEdge"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public EventsMap AddEdge(AddEdgeModel newEdge, int userId)
        {
            Game gameInfo = Context.Game.FirstOrDefault(x => x.state != GameState.DELETE && x.id == newEdge.gameId);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(gameInfo.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            EventsMap eventsMap = new()
            {
                source = newEdge.source,
                target = newEdge.target,
                gameId = newEdge.gameId,
            };
            Context.Add(eventsMap);
            Context.SaveChanges();
            return eventsMap;
        }
        /// <summary>
        /// 删除事件
        /// </summary>
        /// <param name="eventId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool DelEvent(int eventId, int userId)
        {
            Event @event = Context.Event.Include(x => x.EventTreeViewData).FirstOrDefault(x => x.id == eventId);
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            Game gameInfo = Context.Game.FirstOrDefault(x => x.state != GameState.DELETE && x.id == @event.gameId);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(gameInfo.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            if (@event.isStartEvent)
            {
                throw new Exception("初始事件无法删除");
            }
            @event.state = GameState.DELETE;
            List<EventsMap> eventsMap = Context.EventsMap.Where(x => x.target == eventId || x.source == eventId).ToList();
            eventsMap.ForEach(x =>
            {
                Context.EventsMap.Remove(x);
            });
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 编辑事件
        /// </summary>
        /// <param name="eventEditData"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Event EditEvent(EventEditModel eventEditData, int userId)
        {
            Event @event = Context.Event.Include(x => x.EventTreeViewData).FirstOrDefault(x => x.id == eventEditData.id);
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            Game gameInfo = Context.Game.FirstOrDefault(x => x.state != GameState.DELETE && x.id == @event.gameId);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(gameInfo.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            @event.eventName = eventEditData.eventName;
            @event.endType = eventEditData.endType;
            @event.enterCondition = string.Join(',', eventEditData.enterCondition);
            Context.SaveChanges();
            return @event;
        }
        /// <summary>
        /// 获取台词
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="eventId"></param>
        /// <param name="lineId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Lines GetLines(int gameId, int eventId, int lineId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(game.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
            }
            Event @event = null;
            if (eventId == 0)
            {
                @event = Context.Event.FirstOrDefault(x => x.isStartEvent && x.gameId == gameId);
            }
            else
            {
                @event = Context.Event.FirstOrDefault(x => x.id == eventId);

            }
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
            }
            Lines lines = null;
            if (lineId == 0)
            {
                lines = Context.Lines.Include(x => x.LinesBgm).Include(x => x.LinesBackground).Include(x => x.LinesContent).Include(x => x.LinesVoice).Include(x => x.LinesChara).FirstOrDefault(x => x.pre == 0 && x.eventId == @event.id);
            }
            else
            {
                lines = Context.Lines.Include(x => x.LinesBgm).Include(x => x.LinesBackground).Include(x => x.LinesContent).Include(x => x.LinesVoice).Include(x => x.LinesChara).FirstOrDefault(x => x.id == lineId && x.eventId == @event.id);
            }
            if (lines == null)
            {
                throw new Exception("台词不存在");
            }
            if (!groupServices.CheckRole((int)lines.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
            }

            return lines;
        }
        /// <summary>
        /// 获取事件所有的台词
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="eventId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<Lines> GetLinesListOfEvent(int gameId, int eventId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(game.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
            }
            Event @event = null;
            if (eventId == 0)
            {
                @event = Context.Event.FirstOrDefault(x => x.isStartEvent && x.gameId == gameId);
            }
            else
            {
                @event = Context.Event.FirstOrDefault(x => x.id == eventId);

            }
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
            }
            List<Lines> linesList = Context.Lines.Include(x => x.LinesContent).Where(x => x.eventId == @event.id).ToList();
            List<Lines> formetLinesList = new();
            Lines firstLines = linesList.Find(x => x.pre == 0);
            if (firstLines == null)
            {
                return formetLinesList;
            }
            formetLinesList.Add(firstLines);
            int nowId = firstLines.next;
            while (nowId != 0)
            {
                Lines nextLines = linesList.Find(x => x.id == nowId);
                if (nextLines == null)
                {
                    return formetLinesList;
                }
                if (formetLinesList.Find(x => x.id == nowId) != null)
                {
                    return formetLinesList;
                }
                formetLinesList.Add(nextLines);
                nowId = nextLines.next;
            }

            return formetLinesList;
        }
        /// <summary>
        /// 创建第一个台词
        /// </summary>
        /// <param name="newLines"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Lines CreateFirstLines(CreateLinesModel newLines, int userId)
        {
            Event @event = null;
            if (newLines.eventId == 0)
            {
                if (newLines.gameId == null)
                {
                    throw new Exception("缺少游戏id");
                }
                @event = Context.Event.Include(x => x.EventTreeViewData).FirstOrDefault(x => x.isStartEvent && x.gameId == newLines.gameId);
            }
            else
            {
                @event = Context.Event.Include(x => x.EventTreeViewData).FirstOrDefault(x => x.id == newLines.eventId);
            }
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            Game game = Context.Game.FirstOrDefault(x => x.id == @event.gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            Lines lines = new()
            {
                eventId = @event.id,
                next = 0,
                pre = 0,
                groupId = (int)@event.groupId,
                gameId = @event.gameId,
                LinesBackground = new LinesBackground()
                {
                    background = newLines.LinesBackground.background,
                    style = newLines.LinesBackground.style,
                    bindingId = newLines.LinesBackground.bindingId,
                    materialId = newLines.LinesBackground.materialId,
                    isCG = newLines.LinesBackground.isCG,
                },
                LinesBgm = new LinesBgm()
                {
                    bgm = newLines.LinesBgm.bgm,
                    bindingId = newLines.LinesBgm.bindingId,
                    materialId = newLines.LinesBgm.materialId,
                },
                LinesContent = game.langeuage.Split(",").Select(x =>
                {
                    LinesContentCreateModel linesContentCreateModel = newLines.LinesContent.FirstOrDefault(y => y.language == x);
                    if (linesContentCreateModel != null)
                    {
                        return new LinesContent()
                        {
                            linesContent1 = linesContentCreateModel.linesContent1,
                            characters = linesContentCreateModel.characters,
                            language = linesContentCreateModel.language
                        };
                    }
                    else
                    {
                        return new LinesContent() { linesContent1 = "", characters = "", language = x };
                    }
                }).ToList(),
                LinesVoice = game.voiceLangeuage.Split(",").Select(x =>
                {
                    LinesVoiceCreateModel linesVoiceCreate = newLines.LinesVoice.FirstOrDefault(y => y.language == x);
                    if (linesVoiceCreate != null)
                    {
                        return new LinesVoice()
                        {
                            voice = linesVoiceCreate.voice,
                            language = linesVoiceCreate.language,
                            bingdingId = linesVoiceCreate.bindingId,
                            materialId = linesVoiceCreate.materialId,
                        };
                    }
                    else
                    {
                        return new LinesVoice() { voice = "", language = x };
                    }
                }).ToList(),
                LinesChara = newLines.LinesChara.Select(x => new LinesChara()
                {
                    charaPics = x.charaPics,
                    charaStyle = x.charaStyle,
                    bindingId = x.bindingId,
                    materialId = x.materialId,
                }).ToList(),
            };
            Context.Add(lines);
            Context.SaveChanges();
            return lines;
        }
        /// <summary>
        /// 插入台词
        /// </summary>
        /// <param name="newLines"></param>
        /// <param name="type"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Lines InsertLines(CreateLinesModel newLines, int userId)
        {
            if (newLines.pre == null || newLines.next == null)
            {
                throw new Exception("请输入完整参数");
            }
            Event @event = Context.Event.Include(x => x.EventTreeViewData).FirstOrDefault(x => x.id == newLines.eventId);
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            Game game = Context.Game.FirstOrDefault(x => x.id == @event.gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            Lines nextLines = Context.Lines.FirstOrDefault(x => x.id == newLines.next);
            Lines preLines = Context.Lines.FirstOrDefault(x => x.id == newLines.pre);
            if ((nextLines == null && newLines.next != 0) || (preLines == null && newLines.pre != 0))
            {
                throw new Exception("台词不存在");
            }
            Lines lines = new()
            {
                eventId = newLines.eventId,
                LinesBackground = new LinesBackground()
                {
                    background = newLines.LinesBackground.background,
                    style = newLines.LinesBackground.style,
                    bindingId = newLines.LinesBackground.bindingId,
                    materialId = newLines.LinesBackground.materialId,
                    isCG = newLines.LinesBackground.isCG,
                },
                LinesBgm = new LinesBgm()
                {
                    bgm = newLines.LinesBgm.bgm,
                    bindingId = newLines.LinesBgm.bindingId,
                    materialId = newLines.LinesBgm.materialId,
                },
                next = (int)newLines.next,
                pre = (int)newLines.pre,
                groupId = (int)@event.groupId,
                gameId = @event.gameId,
                LinesContent = game.langeuage.Split(",").Select(x =>
                {
                    LinesContentCreateModel linesContentCreateModel = newLines.LinesContent.FirstOrDefault(y => y.language == x);
                    if (linesContentCreateModel != null)
                    {
                        return new LinesContent()
                        {
                            linesContent1 = linesContentCreateModel.linesContent1,
                            characters = linesContentCreateModel.characters,
                            language = linesContentCreateModel.language,

                        };
                    }
                    else
                    {
                        return new LinesContent() { linesContent1 = "", characters = "", language = x };
                    }
                }).ToList(),
                LinesVoice = game.voiceLangeuage.Split(",").Select(x =>
                {
                    LinesVoiceCreateModel linesVoiceCreate = newLines.LinesVoice.FirstOrDefault(y => y.language == x);
                    if (linesVoiceCreate != null)
                    {
                        return new LinesVoice()
                        {
                            voice = linesVoiceCreate.voice,
                            language = linesVoiceCreate.language,
                            bingdingId = linesVoiceCreate.bindingId,
                            materialId = linesVoiceCreate.materialId,
                        };
                    }
                    else
                    {
                        return new LinesVoice() { voice = "", language = x };
                    }
                }).ToList(),
                LinesChara = newLines.LinesChara.Select(x => new LinesChara()
                {
                    charaPics = x.charaPics,
                    charaStyle = x.charaStyle,
                    bindingId = x.bindingId,
                    materialId = x.materialId,
                }).ToList(),
            };
            Context.Add(lines);
            Context.SaveChanges();
            if (nextLines != null)
            {
                nextLines.pre = lines.id;
            }
            if (preLines != null)
            {
                preLines.next = lines.id;
            }
            Context.SaveChanges();
            return lines;
        }
        /// <summary>
        /// 删除台词
        /// </summary>
        /// <param name="linesId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool DelLines(int linesId, int userId)
        {
            Lines linesDel = Context.Lines.Include(x => x.LinesBgm).Include(x => x.LinesBackground).Include(x => x.LinesContent).Include(x => x.LinesVoice).Include(x => x.LinesChara).FirstOrDefault(x => x.id == linesId);
            Event @event = Context.Event.FirstOrDefault(x => x.id == linesDel.eventId);
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            Lines nextLines = Context.Lines.FirstOrDefault(x => x.id == linesDel.next);
            Lines preLines = Context.Lines.FirstOrDefault(x => x.id == linesDel.pre);
            if ((nextLines == null && linesDel.next != 0) || (preLines == null && linesDel.pre != 0))
            {
                throw new Exception("台词不存在");
            }
            Context.Lines.Remove(linesDel);
            if (nextLines != null)
            {
                nextLines.pre = linesDel.pre;
            }
            if (preLines != null)
            {
                preLines.next = linesDel.next;
            }
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 编辑台词
        /// </summary>
        /// <param name="newLines"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Lines EditLines(CreateLinesModel newLines, int userId)
        {
            if (newLines.id == null)
            {
                throw new Exception("请输入完整参数");
            }
            Event @event = Context.Event.Include(x => x.EventTreeViewData).FirstOrDefault(x => x.id == newLines.eventId);
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            Game game = Context.Game.FirstOrDefault(x => x.id == @event.gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            Lines lines = Context.Lines.Include(x => x.LinesBackground).Include(x => x.LinesBgm).FirstOrDefault(x => x.id == newLines.id);
            Context.LinesContent.Where(x => x.linesId == lines.id).ToList().ForEach(x =>
            {
                Context.LinesContent.Remove(x);
            });
            Context.LinesVoice.Where(x => x.linesId == lines.id).ToList().ForEach(x =>
            {
                Context.LinesVoice.Remove(x);
            });
            Context.LinesChara.Where(x => x.linesId == lines.id).ToList().ForEach(x =>
            {
                Context.LinesChara.Remove(x);
            });
            lines.eventId = newLines.eventId;
            lines.gameId = @event.gameId;
            lines.LinesBackground.background = newLines.LinesBackground.background;
            lines.LinesBackground.style = newLines.LinesBackground.style;
            lines.LinesBackground.bindingId = newLines.LinesBackground.bindingId;
            lines.LinesBackground.materialId = newLines.LinesBackground.materialId;
            lines.LinesBackground.isCG = newLines.LinesBackground.isCG;
            lines.LinesBgm = new LinesBgm()
            {
                bgm = newLines.LinesBgm.bgm,
                bindingId = newLines.LinesBgm.bindingId,
                materialId = newLines.LinesBgm.materialId,
            };
            lines.LinesContent = game.langeuage.Split(",").Select(x =>
            {
                LinesContentCreateModel linesContentCreateModel = newLines.LinesContent.FirstOrDefault(y => y.language == x);
                if (linesContentCreateModel != null)
                {
                    return new LinesContent()
                    {
                        linesContent1 = linesContentCreateModel.linesContent1,
                        characters = linesContentCreateModel.characters,
                        language = linesContentCreateModel.language
                    };
                }
                else
                {
                    return new LinesContent() { linesContent1 = "", characters = "", language = x };
                }
            }).ToList();
            lines.LinesVoice = game.voiceLangeuage.Split(",").Select(x =>
            {
                LinesVoiceCreateModel linesVoiceCreate = newLines.LinesVoice.FirstOrDefault(y => y.language == x);
                if (linesVoiceCreate != null)
                {
                    return new LinesVoice()
                    {
                        voice = linesVoiceCreate.voice,
                        language = linesVoiceCreate.language,
                        bingdingId = linesVoiceCreate.bindingId,
                        materialId = linesVoiceCreate.materialId,
                    };
                }
                else
                {
                    return new LinesVoice() { voice = "", language = x };
                }
            }).ToList();
            lines.LinesChara = newLines.LinesChara.Select(x => new LinesChara()
            {
                charaPics = x.charaPics,
                charaStyle = x.charaStyle,
                bindingId = x.bindingId,
                materialId = x.materialId,
            }).ToList();
            Context.SaveChanges();
            return lines;
        }
        /// <summary>
        /// 绑定素材
        /// </summary>
        /// <param name="bingdingData"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public GameBinding Binding(GameBindingModel bingdingData, int userId)
        {
            Game gameInfo = Context.Game.FirstOrDefault(x => x.state != GameState.DELETE && x.id == bingdingData.gameId);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(gameInfo.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            GameBinding gameBinding = new()
            {
                gameId = bingdingData.gameId,
                name = bingdingData.name,
                type = bingdingData.type,
                folderId = bingdingData.folderId,
                cover = bingdingData.cover
            };
            Context.GameBinding.Add(gameBinding);
            Context.SaveChanges();
            return gameBinding;
        }
        /// <summary>
        /// 获取绑定信息
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<GameBinding> GetBindingInfo(int gameId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(game.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
            }
            List<GameBinding> events = Context.GameBinding.Where(x => x.gameId == gameId).ToList();
            return events;
        }
        /// <summary>
        /// 编辑绑定
        /// </summary>
        /// <param name="bingdingData"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public GameBinding EditBinding(GameBinding bingdingData, int userId)
        {
            Game gameInfo = Context.Game.FirstOrDefault(x => x.state != GameState.DELETE && x.id == bingdingData.gameId);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(gameInfo.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            GameBinding gameBinding = Context.GameBinding.FirstOrDefault(x => x.id == bingdingData.id);
            if (gameBinding == null)
            {
                throw new Exception("绑定信息不存在");
            }
            gameBinding.name = bingdingData.name;
            gameBinding.folderId = bingdingData.folderId;
            gameBinding.cover = bingdingData.cover;
            Context.SaveChanges();
            return gameBinding;
        }
        /// <summary>
        /// 删除绑定
        /// </summary>
        /// <param name="bingdingId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool DelBinding(int bingdingId, int userId)
        {
            GameBinding gameBinding = Context.GameBinding.FirstOrDefault(x => x.id == bingdingId);
            if (gameBinding == null)
            {
                throw new Exception("绑定不存在");
            }
            Game gameInfo = Context.Game.FirstOrDefault(x => x.state != GameState.DELETE && x.id == gameBinding.gameId);
            if (gameInfo == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(gameInfo.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            Context.GameBinding.Remove(gameBinding);
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 添加选项
        /// </summary>
        /// <param name="newOption"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Option AddOption(OptionModel newOption, int userId)
        {
            Event @event = Context.Event.FirstOrDefault(x => x.id == newOption.eventId);
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            Option option = new()
            {
                gameId = @event.gameId,
                optionContent = newOption.optionContent,
                eventId = newOption.eventId,
                selectNum = 0
            };
            Context.Option.Add(option);
            Context.SaveChanges();
            return option;
        }
        /// <summary>
        /// 编辑选项内容
        /// </summary>
        /// <param name="newOption"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public Option EditOption(OptionModel newOption, int userId)
        {
            Option option = Context.Option.FirstOrDefault(x => x.id == newOption.id);
            if (option == null)
            {
                throw new Exception("选项不存在");
            }
            Event @event = Context.Event.FirstOrDefault(x => x.id == option.eventId);
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            option.optionContent = newOption.optionContent;
            Context.SaveChanges();
            return option;
        }
        /// <summary>
        /// 删除选项
        /// </summary>
        /// <param name="optionId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool DelOption(int optionId, int userId)
        {
            Option option = Context.Option.FirstOrDefault(x => x.id == optionId);
            if (option == null)
            {
                throw new Exception("选项不存在");
            }
            Event @event = Context.Event.FirstOrDefault(x => x.id == option.eventId);
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.WRITER))
            {
                throw new Exception("无权限");
            }
            Context.Option.Remove(option);
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 获取某个事件的选项
        /// </summary>
        /// <param name="eventId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<Option> GetOptions(int eventId, int userId)
        {
            Event @event = Context.Event.FirstOrDefault(x => x.id == eventId);
            if (@event == null)
            {
                throw new Exception("事件不存在");
            }
            if (!groupServices.CheckRole((int)@event.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
            }
            List<Option> options = Context.Option.Where(x => x.eventId == eventId).ToList();
            return options;
        }
        /// <summary>
        /// 获取某个游戏所有的选项
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public List<Option> GetOptionsOfgame(int gameId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole((int)game.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
            }
            List<Option> options = Context.Option.Where(x => x.gameId == gameId).ToList();
            return options;
        }
        /// <summary>
        /// 保存游戏存档
        /// </summary>
        /// <param name="userSave"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public UserSave SaveGame(UserSaveModel userSave, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == userSave.gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            UserSave saveData = Context.UserSave.FirstOrDefault(x => x.saveIndex == userSave.saveIndex && x.userId == userId && x.gameId == userSave.gameId);
            if (saveData != null)
            {
                saveData.linesContent = userSave.linesContent;
                saveData.choOptions = userSave.choOptions;
                saveData.img = userSave.img;
                saveData.eventName = userSave.eventName;
                saveData.saveTime = TimeUtils.GetNowTime();
                saveData.linesId = userSave.linesId;
            }
            else
            {
                saveData = new()
                {
                    gameId = userSave.gameId,
                    saveTime = TimeUtils.GetNowTime(),
                    img = userSave.img,
                    eventName = userSave.eventName,
                    linesContent = userSave.linesContent,
                    linesId = userSave.linesId,
                    choOptions = userSave.choOptions,
                    saveIndex = userSave.saveIndex,
                    userId = userSave.userId
                };
                Context.Add(saveData);
            }
            Context.SaveChanges();
            return saveData;
        }
        /// <summary>
        /// 删除存档
        /// </summary>
        /// <param name="saveId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool DelSave(int saveId, int userId)
        {
            UserSave save = Context.UserSave.FirstOrDefault(x => x.id == saveId);
            if (save == null)
            {
                throw new Exception("存档不存在");
            }
            if (save.userId != userId)
            {
                throw new Exception("无权限");
            }
            Context.Remove(save);
            Context.SaveChanges();
            return true;
        }
        /// <summary>
        /// 收藏
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool Star(int gameId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            Star star = Context.Star.FirstOrDefault(x => x.userId == userId && x.gameId == gameId);
            if (star != null)
            {
                throw new Exception("已收藏");
            }
            game.starNum++;
            Star newstar = new()
            {
                gameId = gameId,
                userId = userId,
                starTime = TimeUtils.GetNowTime()
            };
            Context.Star.Add(newstar);
            Context.SaveChanges();
            NotificationModel newNotification = new()
            {
                linkId = gameId,
                type = NotificationType.STAR,
                sourceUserId = userId,
                userId = game.userId
            };
            notificationServices.SendNotification(newNotification);
            return true;
        }
        /// <summary>
        /// 取消收藏
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool UnStar(int gameId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            Star star = Context.Star.FirstOrDefault(x => x.userId == userId && x.gameId == gameId);
            if (star == null)
            {
                throw new Exception("已取消收藏");
            }
            if (game.starNum > 0)
            {
                game.starNum--;
            }
            Context.Star.Remove(star);
            Context.SaveChanges();

            return true;
        }
        /// <summary>
        /// 点赞
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool Like(int gameId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            Like like = Context.Like.FirstOrDefault(x => x.userId == userId && x.gameId == gameId);
            if (like != null)
            {
                throw new Exception("已点赞");
            }
            game.likeNum++;
            Like newLike = new()
            {
                gameId = gameId,
                userId = userId,
                likeTime = TimeUtils.GetNowTime()
            };
            Context.Like.Add(newLike);
            Context.SaveChanges();
            NotificationModel newNotification = new()
            {
                linkId = gameId,
                type = NotificationType.LIKEGAME,
                sourceUserId = userId,
                userId = game.userId
            };
            notificationServices.SendNotification(newNotification);
            return true;
        }
        /// <summary>
        /// 取消点赞
        /// </summary>
        /// <param name="gameId"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        /// <exception cref="Exception"></exception>
        public bool UnLike(int gameId, int userId)
        {
            Game game = Context.Game.FirstOrDefault(x => x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            Like like = Context.Like.FirstOrDefault(x => x.userId == userId && x.gameId == gameId);
            if (like == null)
            {
                throw new Exception("已取消点赞");
            }
            if (game.likeNum > 0)
            {
                game.likeNum--;
            }
            Context.Like.Remove(like);
            Context.SaveChanges();

            return true;
        }
        /// <summary>
        /// 获取收藏的游戏
        /// </summary>
        /// <param name="position"></param>
        /// <param name="limit"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public string GetStarGame(int position, int limit, int userId)
        {
            List<Star> stars = Context.Star.Include(x => x.game.user).Include(x => x.game).Where(x => x.userId == userId).Skip(position).Take(limit).ToList();
            List<Game> games = stars.Select(x => x.game).ToList();
            var res = new
            {
                games,
                total = Context.Star.Where(x => x.userId == userId).Count()
            };
            return JsonUtils.ToJson(res);
        }
    }
}
