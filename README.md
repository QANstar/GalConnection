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

- 推荐
- 收藏
- 用户系统：关注、粉丝、私信、通知
- 我的作品：草稿、创作、预览、分析
- 搜索
- 分类
- 我游玩的作品（历史）
- 评论、弹幕

# 技术点

- OSS
- VITS
- 图
- 可视化制作
- 脚本制作
- 脚本编辑器
- 图片、语音、视频缓存
- 推荐算法
- 响应式
- 弹幕
- 团队协作

# 数据结构

## 引擎

### 游戏(Galgame)

| 属性      | 解释       | 类型     |
| --------- | ---------- | -------- |
| id        | 游戏id     | string   |
| userId    | 创建者id   | string   |
| gameName  | 游戏名称   | string   |
| homeBg    | 首页背景   | string   |
| cover     | 封面       | string   |
| preCG     | 预览CG     | string[] |
| tag       | 标签       | string[] |
| language  | 支持的语言 | string[] |
| introduce | 介绍       | string   |
| state     | 状态       | string   |

### 台词(Lines)

| 属性            | 解释         | 类型     |
| --------------- | ------------ | -------- |
| id              | 台词id       | string   |
| groupId         | 组id         | string   |
| next            | 下一个台词id | number   |
| pre             | 上一个台词id | number   |
| eventId         | 事件id       | string   |
| charaPics       | 角色立绘     | string[] |
| charaStyle      | 立绘样式     | string[] |
| background      | 背景         | string   |
| backgroundStyle | 背景样式     | string   |
| bgm             | 背景音乐     | string   |

### 台词内容(LinesContent)

| 属性         | 解释         | 类型   |
| ------------ | ------------ | ------ |
| id           | 台词内容id   | string |
| linesId      | 台词id       | string |
| linesContent | 台词内容     | string |
| characters   | 说话角色名称 | string |
| language     | 语言         | string |

### 台词语音(LinesVoice)

| 属性     | 解释       | 类型   |
| -------- | ---------- | ------ |
| id       | 台词内容id | string |
| linesId  | 台词id     | string |
| voice    | 语音       | string |
| language | 语言       | string |

### 事件(Events)

| 属性           | 解释         | 类型     |
| -------------- | ------------ | -------- |
| id             | 事件id       | string   |
| groupId        | 组id         | string   |
| gameId         | 所属游戏id   | string   |
| eventName      | 事件名称     | string   |
| endType        | 事件结束类型 | EndType  |
| enterCondition | 进入条件     | string[] |

### 事件有向图(EventsMap)

| 属性    | 解释       | 类型   |
| ------- | ---------- | ------ |
| edgeId  | 边id       | int    |
| gameId  | 游戏id     | int    |
| source  | 来源事件id | int    |
| target  | 目标事件id | int    |
| groupId | 组id       | string |

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
| END      | 结局     |

## 社区

### 用户游玩的galgame（UserPlayedGame）

| 属性       | 解释         | 类型     |
| ---------- | ------------ | -------- |
| id         | 游玩id       | string   |
| userId     | 用户id       | string   |
| gameId     | 游戏id       | string   |
| playStart  | 开始游玩时间 | number   |
| playLast   | 最后游玩时间 | number   |
| playDuring | 总游玩时间   | number   |
| progress   | 进度         | float    |
| endId      | 达成结局id   | string[] |
| cgId       | 解锁cgId     | string[] |

### 用户(User)

| 属性      | 解释     | 类型   |
| --------- | -------- | ------ |
| id        | 用户id   | string |
| email     | 邮箱     | string |
| password  | 密码     | string |
| nickname  | 名称     | string |
| avatar    | 头像     | string |
| banner    | 首页大图 | string |
| introduce | 介绍     | string |
| createAt  | 注册时间 | number |

### 组详情(Group)

| 属性       | 解释     | 类型   |
| ---------- | -------- | ------ |
| id         | 组id     | int    |
| type       | 类型     | int    |
| creactTime | 创建时间 | number |

### 组用户信息(UserGroup)

| 属性     | 解释         | 类型   |
| -------- | ------------ | ------ |
| id       | id           | int    |
| groupId  | 组id         | int    |
| userId   | 用户id       | int    |
| role     | 权限（角色） | int    |
| joinTime | 加入时间     | number |

### 素材文件(MaterialFile)

| 属性       | 解释             | 类型   |
| ---------- | ---------------- | ------ |
| name       | 文件名称         | string |
| userId     | 文件拥有者       | string |
| groupId    | 组id             | string |
| type       | 文件类型         | string |
| pid        | 文件所处文件夹id | number |
| creactTime | 创建时间         | number |
| editTime   | 编辑时间         | number |

### 素材(Material)

| 属性       | 解释     | 类型   |
| ---------- | -------- | ------ |
| id         | 素材id   | string |
| type       | 素材类型 | string |
| link       | 素材链接 | string |
| fileId     | 文件id   | number |
| useId      | 拥有者id | number |
| createTime | 创建时间 | number |
| editTime   | 编辑时间 | number |
| state      | 状态     | int    |

### 聊天室(ChatRoom)

| 属性          | 解释               | 类型    |
| ------------- | ------------------ | ------- |
| id            | 聊天室id           | number  |
| createTime    | 创建时间           | number  |
| isGroup       | 是否群聊           | Boolean |
| lastWords     | 最后一个聊天       | string  |
| lastWordsTime | 最后一个聊天的时间 | number  |

### 聊天室用户(ChatRoomUsers)

| 属性     | 解释         | 类型   |
| -------- | ------------ | ------ |
| id       | 聊天室用户id | number |
| userId   | 用户id       | number |
| roomId   | 聊天室id     | number |
| jionTime | 加入时间     | number |

### 聊天内容(ChatContent)

| 属性       | 解释         | 类型   |
| ---------- | ------------ | ------ |
| id         | 聊天内容id   | number |
| chatUserId | 说话的用户id | number |
| roomId     | 聊天室id     | number |
| words      | 说话内容     | string |
| createTime | 创建时间     | number |

### 聊天内容状态(ChatContentState)

| 属性          | 解释           | 类型    |
| ------------- | -------------- | ------- |
| id            | 聊天内容状态id | number  |
| userId        | 用户id         | number  |
| isRead        | 是否已读       | Boolean |
| chatContentId | 聊天内容id     | number  |

## 使用技术

前端：React、Typescript

后端：Asp.Net Core

数据库: sql server

AI合成音：VITS

## 流程

- 引擎基础（台词、人物显示、选项、分支）运行  ✅ 2022/8/29-2022/8/31

- 基础用户系统（登录、注册）✅ 2022/9/2

- OSS ✅ 2022/10/8

- 完善用户中心（头像、头图和信息的编辑） ✅ 2022/10/8-2022/10/9

- 素材中心 ✅ 2022/12/31-2023/01/27

- 引擎后端结构：创建、保存、发布、响应游戏资源，响应我的创作数据，响应游戏信息 ✅ 2023/01/27 - 2023/2/28

- 可视化前端制作基础（台词、立绘、样式、动画（framer-motion）、语音，bgm，视频，模块化的~~树状图~~有向图（reactflow））✅ 2023/01/27 - 2023/2/28

- 完善创作系统，添加素材系统  ✅ 2023/01/27 - 2023/2/28

- 模块化事件制作 ✅ 2023/01/27 - 2023/2/28

- 前端我的创作，首页简单显示 ✅ 2023/03/05 - 2023/3/06

- 筛选与搜索 ✅ 2023/03/07 - 2023/3/07

- 完善引擎（存档、设置、回顾、预加载） ✅ 2023/03/07 - 2023/3/14

- 关注、喜欢、收藏功能 ✅ 2023/03/14 - 2023/3/16

- 完善用户系统（私信）✅ 2023/03/17 - 2023/3/25

  #### 有余力可选功能

- VITS AI合成语音

- 弹幕、评论

- 数据分析

- 脚本语言及编辑器

- 推荐算法

- 美化、响应式

- 多语言

- 团队制作

- 素材分享