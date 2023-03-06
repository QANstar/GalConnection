import {
  IAddEvent,
  IAddEventResponse,
  IBinding,
  ICreateGame,
  IEdge,
  IEditEvent,
  IEditEventPosition,
  IEvent,
  IEventMap,
  IGame,
  IGameCreateInfo,
  IGameRunData,
  ILines,
  IOptions
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

// 获取用户制作的游戏
export const getGamesOfUser = () =>
  request.get<IGame[]>('/api/Game/GetGamesOfUser')

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
export const getRecommenderGameList = () =>
  request.get<IGame[]>('/api/Game/GetRecommenderGameList')
