import React from 'react'
import ChatInput from './ChatInput'

import style from './style.module.scss'

const ChatRoom = () => {
  return (
    <div className={style.room}>
      <header className={style.header}>QANstar</header>
      <main className={style.chatMain}>
        <div className={style.chatContent}></div>
        <div className={style.chatBottom}>
          <ChatInput />
        </div>
      </main>
    </div>
  )
}

export default ChatRoom
