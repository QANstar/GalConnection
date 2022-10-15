export interface IUser {
  id: number
  email: string
  nickname: string
  avatar: string
  token: string
  banner: string
  introduce: string
  createdAt: number
}

export interface IRegister {
  email: string
  nickname: string
  password: string
}

export interface ILogin {
  email: string
  password: string
}

export interface IEditUserInfo {
  nickname: string
  introduce: string
}

export enum OssFileType {
  Background,
  CG,
  Character,
  Cover,
  Avatar,
  Banner
}
