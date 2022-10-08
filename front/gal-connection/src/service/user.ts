import { ILogin, IRegister, IUser } from '../types/type'
import request from './request'

// 注册
export const signUp = (params: IRegister) =>
  request.post<string>('/api/User/userSginUp', params)
// 登录
export const login = (params: ILogin) =>
  request.post<string>('/api/User/Login', params)
// 获取用户信息
export const getSelfInfo = () => request.get<IUser>('/api/User/getSelfInfo')
// 获取指定用户信息
export const getUserInfo = (params: { nickname: string }) =>
  request.get<IUser>(`/api/User/getUserInfo?nickname=${params.nickname}`)
