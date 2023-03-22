import React from 'react'
import { Avatar, List } from 'antd'
import style from './style.module.scss'
import { getRelativeTime } from '../../Utils/TimeUtils'
import { IChatRoom } from '../../types/type'
import stores from '../../store'

interface IChatUserListProps {
  chatRooms: IChatRoom[]
  currentRoom?: IChatRoom
  onItemClick: (room: IChatRoom) => void
}

const ChatUserList = (props: IChatUserListProps) => {
  const { user } = stores
  const { chatRooms, currentRoom, onItemClick } = props
  return (
    <div className={style.userList}>
      <header className={style.header}>消息</header>
      <List
        split={false}
        dataSource={chatRooms}
        renderItem={(item) => (
          <List.Item
            onClick={() => onItemClick(item)}
            key={item.id}
            className={
              currentRoom && currentRoom.id === item.id
                ? style.roomAvtiveItem
                : style.roomItem
            }
          >
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
