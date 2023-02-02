import { ICreateGame, IGame } from '../types/type'
import request from './request'

// 创建文件
export const createGame = (params: ICreateGame) =>
  request.post<number>('/api/Game/CreateGame', params)

// 获取用户制作的游戏
export const getGamesOfUser = () =>
  request.get<IGame[]>('/api/Game/GetGamesOfUser')
