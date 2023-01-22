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