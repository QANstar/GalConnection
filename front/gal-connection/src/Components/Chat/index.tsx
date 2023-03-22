import React, { useEffect } from 'react'
import { IChatContent, IChatRoom } from '../../types/type'
import ChatRoom from './ChatRoom'
import ChatUserList from './ChatUserList'

import style from './style.module.scss'

interface IChatProps {
  selectUserId: number
  onItemClick: (room: IChatRoom) => void
  currentRoom?: IChatRoom
  chatRooms: IChatRoom[]
  getChatRoomByUserId: (id: number) => void
  onSendMessage: (words: string) => void
  chatContents: IChatContent[]
}

const Chat = (props: IChatProps) => {
  const {
    chatRooms,
    currentRoom,
    chatContents,
    getChatRoomByUserId,
    onItemClick,
    onSendMessage
  } = props

  useEffect(() => {
    getChatRoomByUserId(props.selectUserId)
  }, [props.selectUserId])

  return (
    <div className={style.main}>
      <div className={style.left}>
        <ChatUserList
          onItemClick={onItemClick}
          currentRoom={currentRoom}
          chatRooms={chatRooms}
        />
      </div>
      <div className={style.right}>
        <ChatRoom
          chatContents={chatContents}
          onSendMessage={onSendMessage}
          room={currentRoom}
        />
      </div>
    </div>
  )
}

export default Chat
