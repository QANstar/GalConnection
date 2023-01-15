export interface IUser {
  id: number
  email: string
  nickname: string
  avatar: string
  token: string
  banner: string
  introduce: string
  createdAt: number
  groupId: number
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

// 文件
export interface IFile {
  id: number
  name: string
  userId: number
  type: string
  pid: number
  creactTime: number
  editTime: number
  groupId: number
  state: number
}

// 组
export interface IGroup {
  groupId: number
  userId: number
  role: number
  joinTime: number
  type: number
  createTime: number
  name: string
}

// 文件夹树
export interface IFolderTree {
  title: string
  key: string
  data?: IFile
  children?: IFolderTree[]
}

// 创建文件夹
export interface ICreateFolder {
  name: string
  type: string
  pid: number
  groupId: number
}
