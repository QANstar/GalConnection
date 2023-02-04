import { ICreateGame, IGame, IGameCreateInfo } from '../types/type'
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
