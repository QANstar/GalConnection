import { IEditUserInfo, ILogin, IRegister, IUser } from '../types/type'
import request from './request'

// 注册
export const signUp = (params: IRegister) =>
  request.post<string>('/api/User/UserSginUp', params)
// 登录
export const login = (params: ILogin) =>
  request.post<string>('/api/User/Login', params)
// 获取用户信息
export const getSelfInfo = () => request.get<IUser>('/api/User/GetSelfInfo')
// 获取指定用户信息
export const getUserInfo = (params: { userId: number }) =>
  request.get<IUser>(`/api/User/GetUserInfo?userId=${params.userId}`)
// 编辑用户信息
export const editUserInfo = (params: IEditUserInfo) =>
  request.post<boolean>('/api/User/EditUserInfo', params)
// 上传用户头像
export const avatarUpload = (params: FormData) =>
  request.post<boolean>('/api/User/AvatarUpload', params)
// 上传用户头图
export const bannerUpload = (params: FormData) =>
  request.post<boolean>('/api/User/BannerUpload', params)
