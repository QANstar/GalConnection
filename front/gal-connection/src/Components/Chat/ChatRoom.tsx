import { Empty } from 'antd'
import React from 'react'
import stores from '../../store'
import { IChatContent, IChatRoom } from '../../types/type'
import ChatInput from './ChatInput'
import style from './style.module.scss'

interface IChatRoomProps {
  room?: IChatRoom
  onSendMessage: (words: string) => void
  chatContents: IChatContent[]
}

const ChatRoom = (props: IChatRoomProps) => {
  const { user } = stores
  const { room, chatContents, onSendMessage } = props
  return (
    <div className={style.room}>
      {room
        ? (
        <>
          <header className={style.header}>
            {room.ChatRoomUsers.filter((x) => x.userId !== user.id)[0].user
              .nickname || ''}
          </header>
          <main className={style.chatMain}>
            <div className={style.chatContent}>
              {chatContents.map((item) => (
                <div key={item.id}>{item.words}</div>
              ))}
            </div>
            <div className={style.chatBottom}>
              <ChatInput onSendMessage={onSendMessage} />
            </div>
          </main>
        </>
          )
        : (
        <div className={style.empty}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
          )}
    </div>
  )
}

export default ChatRoom
