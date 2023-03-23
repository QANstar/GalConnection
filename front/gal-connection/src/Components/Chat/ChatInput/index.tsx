import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'

import style from './style.module.scss'

interface IChatInputProps {
  onSendMessage: (words: string) => void
}

const ChatInput = (props: IChatInputProps) => {
  const [value, setValue] = useState('')
  const onSend = () => {
    setValue('')
    props.onSendMessage(value)
  }
  return (
    <Input.Group compact className={style.chatGroup}>
      <Input
        onPressEnter={onSend}
        value={value}
        onChange={(val) => {
          setValue(val.target.value)
        }}
        className={style.chatInput}
        placeholder="请输入"
      />
      <Button
        onClick={onSend}
        icon={<SendOutlined />}
        className={style.chatBtn}
      />
    </Input.Group>
  )
}

export default ChatInput
