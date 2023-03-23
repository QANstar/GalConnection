import React from 'react'
import { Avatar, Badge, List } from 'antd'
import style from './style.module.scss'
import { getRelativeTime } from '../../Utils/TimeUtils'
import { IChatRoom, IChatRoomOfUser } from '../../types/type'
import stores from '../../store'

interface IChatUserListProps {
  chatRooms: IChatRoomOfUser[]
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
                <Badge color="#ff85c0" offset={[-40, 0]} count={item.unReadNum}>
                  <Avatar
                    size="large"
                    src={
                      item.ChatRoomUsers.filter((x) => x.userId !== user.id)[0]
                        .user.avatar || ''
                    }
                  />
                </Badge>
              }
              title={
                <div>
                  {item.ChatRoomUsers.filter((x) => x.userId !== user.id)[0]
                    .user.nickname || ''}
                </div>
              }
              description={item.lastWords}
            />
            <div className={style.userListItemRight}>
              <div>
                {item.lastWordsTime ? getRelativeTime(item.lastWordsTime) : ''}
              </div>
            </div>
          </List.Item>
        )}
      />
    </div>
  )
}

export default ChatUserList
