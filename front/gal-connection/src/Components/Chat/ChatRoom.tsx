import { Empty } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import stores from '../../store'
import { IChatContent, IChatRoom } from '../../types/type'
import ChatInput from './ChatInput'
import ChatItem from './ChatItem'
import style from './style.module.scss'

interface IChatRoomProps {
  room?: IChatRoom
  onSendMessage: (words: string) => void
  getMore: () => void
  chatContents: IChatContent[]
  hasNext: boolean
}

const ChatRoom = (props: IChatRoomProps) => {
  const { user } = stores
  const { room, chatContents, hasNext, onSendMessage, getMore } = props
  const chatRoomRef = useRef<HTMLDivElement>(null)
  const [isViewHistoryMode, setIsViewHistoryMode] = useState(false)

  const scrollToAnchor = (anchorName: string) => {
    if (anchorName) {
      const anchorElement = document.getElementById(anchorName)
      if (anchorElement) {
        anchorElement.scrollIntoView({ block: 'start', behavior: 'auto' })
      }
    }
  }

  const chatRoomScroll = () => {
    if (chatRoomRef.current) {
      const heightClient = chatRoomRef.current.clientHeight
      const heightScrollTop = chatRoomRef.current.scrollTop
      const heightScroll = chatRoomRef.current.scrollHeight
      if (heightScrollTop < 10 && isViewHistoryMode && hasNext) {
        getMore()
      }
      if (heightClient + heightScrollTop + 20 > heightScroll) {
        if (isViewHistoryMode) setIsViewHistoryMode(false)
      } else {
        if (!isViewHistoryMode) setIsViewHistoryMode(true)
      }
    }
  }

  useEffect(() => {
    if (!isViewHistoryMode) {
      scrollToAnchor('chatBottom')
    }
  }, [chatContents])

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
            <div
              ref={chatRoomRef}
              onScroll={chatRoomScroll}
              className={style.chatContent}
            >
              {chatContents.map((item) => (
                <ChatItem key={item.id} chatContents={item} />
              ))}
              <div id="chatBottom"></div>
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
