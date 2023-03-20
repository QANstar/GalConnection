import { IChatRoom } from '../types/type'
import request from './request'

// 获取用户所有的聊天房间
export const getAllChatRoomsOfUser = () =>
  request.get<IChatRoom[]>('/api/Chat/GetAllChatRoomsOfUser')

// 获取指定两个用户的聊天室
export const getChatRoomByUserId = (targetUserId: number) =>
  request.get<IChatRoom>(
    `/api/Chat/GetChatRoomByUserId?targetUserId=${targetUserId}`
  )
