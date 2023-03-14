import {
  IEditUserInfo,
  ILogin,
  IRegister,
  IUser,
  IUserPageList
} from '../types/type'
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
export const avatarUpdate = (params: { url: string }) =>
  request.post<boolean>(`/api/User/EditAvatar?url=${params.url}`)
// 上传用户头图
export const bannerUpdate = (params: { url: string }) =>
  request.post<boolean>(`/api/User/EditBanner?url=${params.url}`)
// 搜索用户
export const searchUser = (
  searchContent: string,
  position: number,
  limit: number
) =>
  request.get<IUserPageList>(
    `/api/User/SearchUser?searchContent=${searchContent}&position=${position}&limit=${limit}`
  )
// 关注
export const followUser = (followId: number) =>
  request.post<boolean>(`/api/User/FollowUser?followId=${followId}`)
// 取消关注
export const unFollowUser = (followId: number) =>
  request.post<boolean>(`/api/User/UnFollowUser?followId=${followId}`)
// 获取用户关注列表
export const getFollows = (userId: number, position: number, limit: number) =>
  request.get<IUserPageList>(
    `/api/User/GetFollows?userId=${userId}&position=${position}&limit=${limit}`
  )
// 获取粉丝列表
export const getFans = (userId: number, position: number, limit: number) =>
  request.get<IUserPageList>(
    `/api/User/GetFans?userId=${userId}&position=${position}&limit=${limit}`
  )
