import { IEditUserInfo, ILogin, IRegister, IUser } from '../types/type'
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
export const getUserInfo = (params: { userId: number }) =>
  request.get<IUser>(`/api/User/getUserInfo?userId=${params.userId}`)
// 编辑用户信息
export const editUserInfo = (params: IEditUserInfo) =>
  request.post<string>('/api/User/editUserInfo', params)
