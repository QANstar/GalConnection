import { IPageNotification } from '../types/type'
import request from './request'

// 通过游戏id获取创建游戏信息
export const getNotifications = (params: { nextId: number; limit: number }) =>
  request.get<IPageNotification>(
    `/api/Notification/GetNotifications?nextId=${params.nextId}&limit=${params.limit}`
  )

// 获取未读数量
export const getUnReadNum = () =>
  request.get<number>('/api/Notification/GetUnReadNum')

// 设置已读
export const read = (notificationid: number) =>
  request.post<boolean>(
    `/api/Notification/Read?notificationid=${notificationid}`
  )

// 全部已读
export const readAll = () => request.post<boolean>('/api/Notification/ReadAll')
