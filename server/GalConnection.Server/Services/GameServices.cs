using GalConnection.Entity;
using GalConnection.Model;
using GalConnection.Server.Setting;
using GalConnection.Server.Utils;
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
        readonly GalConnectionContext Context;
        public GameServices(GalConnectionContext context)
        {
            Context = context;
            groupServices = new GroupServices(context);
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
            Game game = Context.Game.FirstOrDefault(x => x.state != GameState.DELETE && x.id == gameId);
            if (game == null)
            {
                throw new Exception("游戏不存在");
            }
            if (!groupServices.CheckRole(game.groupId, userId, GroupRole.READER))
            {
                throw new Exception("无权限");
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
                voiceLangeuage = game.voiceLangeuage.Split(","),
                introduce = game.introduce,
                groupId = game.groupId
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
            Game gameInfo = Context.Game.FirstOrDefault(x => x.state != GameState.DELETE && x.id == newGameInfo.id);
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
            if (@event.isStartEvent)
            {
                throw new Exception("初始事件无法删除");
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
                lines = Context.Lines.Include(x => x.LinesBackground).Include(x => x.LinesContent).Include(x => x.LinesVoice).Include(x => x.LinesChara).FirstOrDefault(x => x.pre == 0 && x.eventId == @event.id);
            }
            else
            {
                lines = Context.Lines.Include(x => x.LinesBackground).Include(x => x.LinesContent).Include(x => x.LinesVoice).Include(x => x.LinesChara).FirstOrDefault(x => x.id == lineId && x.eventId == @event.id);
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
                bgm = newLines.bgm,
                next = 0,
                pre = 0,
                groupId = (int)@event.groupId,
                LinesBackground = new LinesBackground()
                {
                    background = newLines.LinesBackground.background,
                    style = newLines.LinesBackground.style,
                    bindingId = newLines.LinesBackground.bindingId,
                    materialId = newLines.LinesBackground.materialId,
                    isCG = newLines.LinesBackground.isCG,
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
            Game game = Context.Game.FirstOrDefault(x => x.id == @event.id);
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
                bgm = newLines.bgm,
                next = (int)newLines.next,
                pre = (int)newLines.pre,
                groupId = (int)@event.groupId,
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
            if (newLines != null)
            {
                newLines.pre = lines.id;
            }
            if (preLines != null)
            {
                preLines.next = lines.id;
            }
            Context.SaveChanges();
            return lines;
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
            Lines lines = Context.Lines.Include(x => x.LinesBackground).FirstOrDefault(x => x.id == newLines.id);
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
            lines.LinesBackground.background = newLines.LinesBackground.background;
            lines.LinesBackground.style = newLines.LinesBackground.style;
            lines.LinesBackground.bindingId = newLines.LinesBackground.bindingId;
            lines.LinesBackground.materialId = newLines.LinesBackground.materialId;
            lines.LinesBackground.isCG = newLines.LinesBackground.isCG;
            lines.bgm = newLines.bgm;
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

    }
}
