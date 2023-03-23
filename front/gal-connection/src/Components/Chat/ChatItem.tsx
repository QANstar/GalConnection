import { Avatar } from 'antd'
import { motion } from 'framer-motion'
import React from 'react'
import stores from '../../store'
import { IChatContent } from '../../types/type'
import style from './style.module.scss'

interface IChatItemProps {
  chatContents: IChatContent
}

const ChatItem = (props: IChatItemProps) => {
  const { user } = stores
  const { chatContents } = props

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={
        chatContents.userId === user.id
          ? style.chatRightItem
          : style.chatLeftItem
      }
    >
      <Avatar
        style={{ cursor: 'pointer' }}
        onClick={() => {
          window.open(`/userCenter/${chatContents.userId}`)
        }}
        size="large"
        src={chatContents.user.avatar || ''}
      />
      <div className={style.words}>{chatContents.words}</div>
    </motion.div>
  )
}

export default ChatItem
