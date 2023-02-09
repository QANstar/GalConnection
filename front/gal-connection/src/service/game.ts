import {
  IAddEvent,
  IAddEventResponse,
  ICreateGame,
  IEdge,
  IEditEvent,
  IEditEventPosition,
  IEvent,
  IEventMap,
  IGame,
  IGameCreateInfo
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
