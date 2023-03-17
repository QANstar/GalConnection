import React from 'react'
import ChatRoom from './ChatRoom'
import ChatUserList from './ChatUserList'

import style from './style.module.scss'

const Chat = () => {
  return (
    <div className={style.main}>
      <div className={style.left}>
        <ChatUserList />
      </div>
      <div className={style.right}>
        <ChatRoom />
      </div>
    </div>
  )
}

export default Chat
