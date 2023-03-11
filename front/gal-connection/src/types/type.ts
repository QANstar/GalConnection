import { BindingType, EventEndType, GameState } from './enums'

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

export interface IUserPageList {
  users: IUser[]
  total: number
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
  groupId: number
  tag: string[]
  cover: string
  homeBg: string
  preCg: string[]
  langeuage: string[]
  voiceLangeuage: string[]
  introduce: string
  gameName: string
}

// 游戏
export interface IGame {
  id: number
  userId: number
  groupId: number
  tag: string
  cover: string
  homeBg: string
  preCG: string
  langeuage: string
  voiceLangeuage: string
  introduce: string
  state: number
  gameName: string
  user?: IUser
  createdAt: number
}

// 游戏分页结果
export interface IPageGameList {
  total: number
  games: IGame[]
}

// 标签
export interface ITag {
  tagId: number
  tag1: string
  gameId: number
}

// 游戏创建信息
export interface IGameCreateInfo {
  id: number
  userId: number
  groupId: number
  tag: string[]
  cover: string
  homeBg: string
  preCG: string[]
  langeuage: string[]
  voiceLangeuage: string[]
  introduce: string
  gameName: string
  state: GameState
  Tag: ITag[]
  createdAt: number
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
  groupId?: number
}

// 事件
export interface IEvent {
  id: number
  gameId: number
  groupId: number
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

// 台词内容
export interface ILinesContent {
  id?: number
  linesId?: number
  linesContent1: string
  characters: string
  language: string
}

// 台词背景/CG
export interface ILinesBackground {
  id?: number
  bindingId?: number
  materialId?: number
  style: string
  background: string
  isCG: boolean
}

// Bgm
export interface ILinesBgm {
  id?: number
  bindingId?: number
  materialId?: number
  bgm: string
}

// 语音
export interface ILinesVoice {
  id?: number
  linesId?: number
  voice?: string
  language?: string
  bingdingId?: number
  materialId?: number
}

// 角色立绘
export interface ILinesChara {
  id?: number
  linesId?: number
  charaPics: string
  charaStyle: string
  bindingId?: number
  materialId?: number
}

// 台词
export interface ILines {
  id?: number
  eventId: number
  gameId?: number
  LinesBackground: ILinesBackground
  next?: number
  pre?: number
  groupId?: number
  LinesContent: ILinesContent[]
  LinesVoice: ILinesVoice[]
  LinesChara: ILinesChara[]
  LinesBgm: ILinesBgm
}

// 绑定
export interface IBinding {
  id?: number
  gameId: number
  name: string
  type: BindingType
  folderId: number
  cover: string
}

// 绑定的表单
export interface IBindingForm {
  name: string
  folderId: number
  cover: string
}

// 选项
export interface IOptions {
  id?: number
  optionContent: string
  eventId: number
  selectNum?: number
  gameId?: number
}

// 存档
export interface ISave {
  id?: number
  saveTime?: number
  img: string
  eventName: string
  linesContent: string
  linesId: number
  choOptions: string
  saveIndex: number
  gameId: number
  userId: number
}

// 游戏运行
export interface IGameRunData {
  events: IEvent[]
  edges: IEdge[]
  lines: ILines[]
  options: IOptions[]
  saves: ISave[]
}

// 游戏状态
export interface IGameState {
  linesId: number
  choOptions: string
}
