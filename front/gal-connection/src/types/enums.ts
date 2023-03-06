// 组角色
export enum EGroupRole {
  OWNER = 1,
  ADMIN = 2,
  WRITER = 3,
  READER = 4
}

// 组类型
export enum EGroupType {
  SHARE = 1,
  PRIVATE = 2,
  SELF = 3
}

// 文件类型
export const FileType = {
  FOLDER: 'folder',
  PICTURE: 'picture',
  VIDEO: 'video',
  SOUND: 'sound'
}

// 事件结束类型
export enum EventEndType {
  NEXT,
  OPTION,
  END,
  VIDEO
}

// 绑定类型
export enum BindingType {
  CHARACTER,
  BACKGROUND,
  CG,
  VOICE,
  BGM
}

// 游戏类型
export enum GameState {
  DELETE,
  DEVELOPMENT,
  PUBLISH
}
