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
- 树状图
- 可视化制作
- 脚本制作
- 脚本编辑器
- 图片、语音、视频缓存
- 推荐算法
- 响应式
- 弹幕

# 数据结构

## 引擎

### 游戏(Galgame)

| 属性      | 解释       | 类型     |
| --------- | ---------- | -------- |
| id        | 游戏id     | string   |
| userId    | 所有者id   | string   |
| homeBg    | 首页背景   | string   |
| cover     | 封面       | string   |
| preCG     | 预览CG     | string[] |
| tag       | 标签       | string[] |
| language  | 支持的语言 | string[] |
| introduce | 介绍       | string   |
| state     | 状态       | string   |

### 台词(Lines)

| 属性            | 解释     | 类型     |
| --------------- | -------- | -------- |
| id              | 台词id   | string   |
| eventId         | 事件id   | string   |
| charaPics       | 角色立绘 | string[] |
| charaStyle      | 立绘样式 | string[] |
| background      | 背景     | string   |
| backgroundStyle | 背景样式 | string   |
| bgm             | 背景音乐 | string   |

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

| 属性     | 解释   | 类型   |
| -------- | ------ | ------ |
| id       | 用户id | string |
| email    | 邮箱   | string |
| password | 密码   | string |
| nickname | 名称   | string |
| avatar   | 头像   | string |

## 使用技术

前端：React、Typescript

后端：Asp.Net Core

数据库: sql server

AI合成音：VITS

## 流程

- 引擎基础（台词、人物显示、选项、分支）运行  ✅ 2022/8/29-2022/8/31
- 基础用户系统（登录、注册）✅ 2022/9/2
- 引擎后端结构
- 可视化前端制作基础（不包含语音，bgm，视频，模块化的树状图）
- 前端我的创作，首页简单显示
- 筛选与搜索
- 完善用户系统（关注、私信）
- 收藏功能
- 完善引擎（存档、设置、回顾、预加载）
- 完善可视化制作，模块化树状图，bgm，视频
- 完善创作系统，添加素材系统
- VITS AI合成语音
- 弹幕、评论
- 数据分析
- 脚本语言及编辑器
- 推荐算法
- 美化、响应式
- 新玩法：roguelike
- 多语言