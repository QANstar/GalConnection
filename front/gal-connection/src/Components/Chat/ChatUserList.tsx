import React from 'react'
import { Avatar, List } from 'antd'

import style from './style.module.scss'
import { getRelativeTime } from '../../Utils/TimeUtils'

const data = [
  {
    id: 1,
    avatar:
      'https://galbucket.oss-cn-hangzhou.aliyuncs.com/user/avatar/63b1bab8-edc1-4784-ab19-c7494e7267f6',
    name: 'QANstar',
    word: '111',
    time: 1679037276888
  },
  {
    id: 2,
    avatar:
      'https://galbucket.oss-cn-hangzhou.aliyuncs.com/user/avatar/63b1bab8-edc1-4784-ab19-c7494e7267f6',
    name: 'QANstar',
    word: '111',
    time: 1679037276888
  },
  {
    id: 3,
    avatar:
      'https://galbucket.oss-cn-hangzhou.aliyuncs.com/user/avatar/63b1bab8-edc1-4784-ab19-c7494e7267f6',
    name: 'QANstar',
    word: '111',
    time: 1679037276888
  },
  {
    id: 14,
    avatar:
      'https://galbucket.oss-cn-hangzhou.aliyuncs.com/user/avatar/63b1bab8-edc1-4784-ab19-c7494e7267f6',
    name: 'QANstar',
    word: '111',
    time: 1679037276888
  }
]

const ChatUserList = () => {
  return (
    <div className={style.userList}>
      <header className={style.header}>消息</header>
      <List
        split={false}
        dataSource={data}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={<Avatar size="large" src={item.avatar} />}
              title={<div>{item.name}</div>}
              description={item.word}
            />
            <div>{getRelativeTime(item.time)}</div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ChatUserList
