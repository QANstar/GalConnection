import React, { useEffect } from 'react'
import useChat from '../../Hooks/useChat'
import ChatRoom from './ChatRoom'
import ChatUserList from './ChatUserList'

import style from './style.module.scss'

interface IChatProps {
  selectUserId: number
}

const Chat = (props: IChatProps) => {
  const { chatRooms, getChatRoomByUserId } = useChat()

  useEffect(() => {
    getChatRoomByUserId(props.selectUserId)
  }, [props.selectUserId])

  return (
    <div className={style.main}>
      <div className={style.left}>
        <ChatUserList chatRooms={chatRooms} />
      </div>
      <div className={style.right}>
        <ChatRoom />
      </div>
    </div>
  )
}

export default Chat
