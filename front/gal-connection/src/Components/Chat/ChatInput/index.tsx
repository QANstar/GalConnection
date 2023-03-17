import { SendOutlined } from '@ant-design/icons'
import { Button, Input } from 'antd'
import React, { useState } from 'react'

import style from './style.module.scss'

const ChatInput = () => {
  const [value, setValue] = useState('')
  return (
    <Input.Group compact className={style.chatGroup}>
      <Input
        onPressEnter={() => {}}
        value={value}
        onChange={(val) => {
          setValue(val.target.value)
        }}
        className={style.chatInput}
        placeholder="请输入"
      />
      <Button
        onClick={() => {}}
        icon={<SendOutlined />}
        className={style.chatBtn}
      />
    </Input.Group>
  )
}

export default ChatInput
