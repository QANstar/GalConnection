# 功能

## galgame引擎

- 首屏壁纸
- 存档（网络）
- 加载
- 人物、壁纸样式（大小，位置）
- 语音
- 动画
- 台词回顾
- 设置

## galgame社区



























# 数据结构

## 引擎

### 游戏(Galgame)

| 属性   | 解释     | 类型     |
| ------ | -------- | -------- |
| id     | 游戏id   | string   |
| userId | 所有者id | string   |
| homeBg | 首页背景 | string   |
| cover  | 封面     | string   |
| tag    | 标签     | string[] |

### 台词(Lines)

| 属性            | 解释     | 类型     |
| --------------- | -------- | -------- |
| id              | 台词id   | string   |
| lines           | 台词     | string   |
| eventId         | 事件id   | string   |
| characters      | 说话角色 | string   |
| charaPics       | 角色立绘 | string[] |
| charaStyle      | 立绘样式 | string[] |
| background      | 背景     | string   |
| backgroundStyle | 背景样式 | string   |
| voice           | 语言     | string   |
| bgm             | 背景音乐 | string   |

### 事件(Events)

| 属性           | 解释         | 类型     |
| -------------- | ------------ | -------- |
| id             | 事件id       | string   |
| gameId         | 所属游戏id   | string   |
| eventName      | 事件名称     | string   |
| pid            | 父亲事件id   | string   |
| endType        | 事件结束类型 | EndType  |
| enterCondition | 进入条件     | string[] |

### 选项(Options)

| 属性      | 解释     | 类型   |
| --------- | -------- | ------ |
| id        | 选项id   | string |
| content   | 选项内容 | string |
| eventId   | 事件id   | string |
| selectNum | 选择数量 | number |

### 事件结束类型(EndType)

| 枚举属性 | 解释     |
| -------- | -------- |
| VIDEO    | 播放视频 |
| OPTION   | 选项     |
| NEXT     | 下一事件 |
| END      | 游戏结束 |

## 社区

### 用户(User)

| 属性     | 解释   | 类型   |
| -------- | ------ | ------ |
| id       | 用户id | string |
| email    | 邮箱   | string |
| password | 密码   | string |
| nickname | 名称   | string |
| avatar   | 头像   | string |