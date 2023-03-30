import {
  IAddEvent,
  IAddEventResponse,
  IBinding,
  IComment,
  ICreateGame,
  IEdge,
  IEditEvent,
  IEditEventPosition,
  IEvent,
  IEventMap,
  IGame,
  IGameCreateInfo,
  IGameRunData,
  IKeyPageGameList,
  ILines,
  IOptions,
  IPageComment,
  IPageGameList,
  ISave
} from '../types/type'
import request from './request'

// 创建文件
export const createGame = (params: ICreateGame) =>
  request.post<number>('/api/Game/CreateGame', params)

// 编辑文件
export const editGame = (params: ICreateGame) =>
  request.post<number>('/api/Game/EditGame', params)

// 通过游戏id获取创建游戏信息
export const getCreateGamesInfoById = (gameId: number) =>
  request.get<IGameCreateInfo>(
    `/api/Game/GetCreateGamesInfoById?gameId=${gameId}`
  )

// 搜索游戏
export const searchGame = (
  searchContent: string,
  position: number,
  limit: number
) =>
  request.get<IPageGameList>(
    `/api/Game/SearchGame?searchContent=${searchContent}&position=${position}&limit=${limit}`
  )

// 获取用户制作的游戏
export const getGamesOfUser = (position: number, limit: number) =>
  request.get<IPageGameList>(
    `/api/Game/GetGamesOfUser?position=${position}&limit=${limit}`
  )

// 获取用户发布的游戏
export const getGameOfUserPublish = (
  userId: number,
  position: number,
  limit: number
) =>
  request.get<IPageGameList>(
    `/api/Game/GetGameOfUserPublish?userId=${userId}&position=${position}&limit=${limit}`
  )

// 创建事件
export const addEvent = (params: IAddEvent) =>
  request.post<IAddEventResponse>('/api/Game/AddEvent', params)

// 获取事件列表
export const getEventList = (gameId: number) =>
  request.get<IEventMap>(`/api/Game/GetEventList?gameId=${gameId}`)

// 编辑事件在树视图中位置
export const editEventPosition = (params: IEditEventPosition) =>
  request.post<string>('/api/Game/EditEventPosition', params)

// 创建事件
export const addEdge = (params: IEdge) =>
  request.post<IEdge>('/api/Game/AddEdge', params)

// 删除事件
export const delEvent = (eventId: number) =>
  request.delete<boolean>(`/api/Game/DelEevent?eventId=${eventId}`)

// 编辑事件
export const editEvent = (params: IEditEvent) =>
  request.post<IEvent>('/api/Game/EditEvent', params)

// 获取台词
export const getLines = (params: {
  gameId: number
  linesId: number
  eventId: number
}) =>
  request.get<ILines>(
    `/api/Game/GetLines?gameId=${params.gameId}&lineId=${params.linesId}&eventId=${params.eventId}`
  )

// 创建第一个台词
export const createFirstLines = (params: ILines) =>
  request.post<ILines>('/api/Game/CreateFirstLines', params)

// 插入台词
export const insertLines = (params: ILines) =>
  request.post<ILines>('/api/Game/InsertLines', params)

// 编辑台词
export const editLines = (params: ILines) =>
  request.post<ILines>('/api/Game/EditLines', params)

// 绑定
export const binding = (params: IBinding) =>
  request.post<IBinding>('/api/Game/Binding', params)

// 编辑绑定
export const editBinding = (params: IBinding) =>
  request.post<IBinding>('/api/Game/EditBinding', params)

// 获取绑定信息
export const getBindingInfo = (params: { gameId: number }) =>
  request.get<IBinding[]>(`/api/Game/GetBindingInfo?gameId=${params.gameId}`)

// 删除绑定
export const delBinding = (params: { bindingId: number }) =>
  request.delete<boolean>(`/api/Game/DelBingding?bindingId=${params.bindingId}`)

// 获取事件所有的台词
export const getLinesListOfEvent = (params: {
  gameId: number
  eventId: number
}) =>
  request.get<ILines[]>(
    `/api/Game/GetLinesListOfEvent?gameId=${params.gameId}&eventId=${params.eventId}`
  )

// 删除台词
export const delLines = (params: { linesId: number }) =>
  request.delete<boolean>(`/api/Game/DelLines?linesId=${params.linesId}`)

// 获取绑定信息
export const getGamePlayData = (params: { gameId: number }) =>
  request.get<IGameRunData>(`/api/Game/GetGamePlayData?gameId=${params.gameId}`)

// 获取某个事件的选项
export const getOptions = (params: { eventId: number }) =>
  request.get<IOptions[]>(`/api/Game/GetOptions?eventId=${params.eventId}`)

// 获取某个游戏所有的选项
export const getOptionsOfgame = (params: { gameId: number }) =>
  request.get<IOptions[]>(`/api/Game/GetOptionsOfgame?gameId=${params.gameId}`)

// 删除选项
export const delOption = (params: { optionId: number }) =>
  request.delete<boolean>(`/api/Game/DelOption?optionId=${params.optionId}`)

// 添加选项
export const addOption = (params: IOptions) =>
  request.post<IOptions>('/api/Game/AddOption', params)

// 编辑选项内容
export const EditOption = (params: IOptions) =>
  request.post<ILines>('/api/Game/EditOption', params)

// 游戏发布
export const gamePublish = (params: { gameId: number; isPublish: boolean }) =>
  request.post<boolean>(
    `/api/Game/GamePublish?gameId=${params.gameId}&isPublish=${params.isPublish}`
  )

// 删除游戏
export const delGame = (params: { gameId: number }) =>
  request.post<boolean>(`/api/Game/DelGame?gameId=${params.gameId}`)

// 获取游戏推荐
export const getRecommenderGameList = (params: {
  lastId: number
  limit: number
}) =>
  request.get<IKeyPageGameList>(
    `/api/Game/GetRecommenderGameList?lastId=${params.lastId}&limit=${params.limit}`
  )

// 获取关注的人的游戏
export const getFollowGameList = (params: { lastId: number; limit: number }) =>
  request.get<IKeyPageGameList>(
    `/api/Game/GetFollowGameList?lastId=${params.lastId}&limit=${params.limit}`
  )

// 获取top10游戏
export const getTopTenGameList = () =>
  request.get<IGame[]>('/api/Game/GetTopTenGameList')

// 存档
export const saveGame = (params: ISave) =>
  request.post<ISave>('/api/Game/SaveGame', params)

// 删除存档
export const delSave = (saveId: number) =>
  request.delete<boolean>(`/api/Game/DelSave?saveId=${saveId}`)

// 收藏
export const star = (gameId: number) =>
  request.post<boolean>(`/api/Game/Star?gameId=${gameId}`)

// 存档
export const unStar = (gameId: number) =>
  request.post<boolean>(`/api/Game/UnStar?gameId=${gameId}`)

// 点赞
export const like = (gameId: number) =>
  request.post<boolean>(`/api/Game/Like?gameId=${gameId}`)

// 取消点赞
export const unLike = (gameId: number) =>
  request.post<boolean>(`/api/Game/UnLike?gameId=${gameId}`)

// 获取用户收藏的游戏
export const getStarGame = (userId: number, position: number, limit: number) =>
  request.get<IPageGameList>(
    `/api/Game/GetStarGame?userId=${userId}&position=${position}&limit=${limit}`
  )

// 获取评论
export const getComment = (gameId: number, position: number, limit: number) =>
  request.get<IPageComment>(
    `/api/Game/GetComment?gameId=${gameId}&position=${position}&limit=${limit}`
  )

// 添加评论
export const addComment = (params: {
  gameId: number
  commentContent: string
}) => request.post<IComment>('/api/Game/AddComment', params)
