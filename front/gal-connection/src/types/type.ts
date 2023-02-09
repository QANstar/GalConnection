import { EventEndType } from './enums'

// 筛选文件类型
export type FilterFileTye = 'all' | 'folder' | 'video' | 'picture' | 'sound'

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
  Banner,
  Picture,
  Video,
  Sound
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
  disabled?: boolean
  children?: IFolderTree[]
}

// 创建文件夹
export interface ICreateFolder {
  name: string
  type: string
  pid: number
  groupId: number
}

// 创建文件
export interface ICreateFile {
  name: string
  type: string
  pid: number
  groupId: number
  link: string
}

// 当前文件夹信息
export interface IFolderInfo {
  createTime: number
  name: string
  pid?: number
  groupId: number
  id: number
}

// 重命名
export interface IRename {
  newName: string
  fileId: number
}

// 创建游戏
export interface ICreateGame {
  id?: number
  tag: string[]
  cover: string
  homeBg: string
  preCg: string[]
  langeuage: string[]
  introduce: string
  gameName: string
}

// 游戏
export interface IGame {
  id: number
  userId: number
  tag: string
  cover: string
  homeBg: string
  preCG: string
  langeuage: string
  introduce: string
  state: number
  gameName: string
}

// 游戏创建信息
export interface IGameCreateInfo {
  id: number
  userId: number
  tag: string[]
  cover: string
  homeBg: string
  preCG: string[]
  langeuage: string[]
  introduce: string
  gameName: string
}

// 事件树数据
export interface IEventTreeViewData {
  eventid?: number
  position: string
}

// 边
export interface IEdge {
  edgeId?: number
  source: number
  target: number
  gameId: number
}

// 事件
export interface IEvent {
  id: number
  gameId: number
  eventName: string
  endType: EventEndType
  enterCondition: string
  isStartEvent: boolean
  EventTreeViewData: IEventTreeViewData
}

// 后端获取事件图
export interface IEventMap {
  events: IEvent[]
  edges: IEdge[]
}

// 创建事件
export interface IAddEvent {
  gameId: number
  eventName: string
  EventTreeViewData: IEventTreeViewData
  edge?: {
    source: number
  }
}

// 改变事件树节点在视图的位置
export interface IEditEventPosition {
  eventid: number
  position: string
}

// 创建事件响应
export interface IAddEventResponse {
  eventShow: IEvent
  edge: IEdge
}

// 编辑事件
export interface IEditEvent {
  id: number
  eventName: string
  endType: EventEndType
  enterCondition: number[]
}
