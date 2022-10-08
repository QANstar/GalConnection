// 事件结束类型
export enum EndType {
  VIDIO,
  OPTION,
  NEXT,
  END
}

// 游戏
export interface IGalgame {
  id: string
  userId: string
  homeBg: string
  cover: string
}

// 台词
export interface ILines {
  id: string
  lines: string
  eventId: string
  characters: string
  charaPics: {
    pics: string
    style: string
  }[]
  background: {
    background: string
    style: string
  }
  voice: string
  bgm: string
}

// 事件
export interface IEvents {
  id: string
  gameId: string
  eventName: string
  pid: string
  endType: EndType
  enterCondition: string[]
}

// 选项
export interface IOptions {
  id: string
  content: string
  eventId: string
  selectNum: number
}
