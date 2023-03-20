import React from 'react'
import { Avatar, List } from 'antd'
import style from './style.module.scss'
import { getRelativeTime } from '../../Utils/TimeUtils'
import { IChatRoom } from '../../types/type'
import stores from '../../store'

interface IChatUserListProps {
  chatRooms: IChatRoom[]
}

const ChatUserList = (props: IChatUserListProps) => {
  const { user } = stores
  const { chatRooms } = props
  return (
    <div className={style.userList}>
      <header className={style.header}>消息</header>
      <List
        split={false}
        dataSource={chatRooms}
        renderItem={(item) => (
          <List.Item key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar
                  size="large"
                  src={
                    item.ChatRoomUsers.filter((x) => x.userId !== user.id)[0]
                      .user.avatar || ''
                  }
                />
              }
              title={
                <div>
                  {item.ChatRoomUsers.filter((x) => x.userId !== user.id)[0]
                    .user.nickname || ''}
                </div>
              }
              description={item.lastWords}
            />
            <div>{getRelativeTime(item.lastWordsTime || 0)}</div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ChatUserList
