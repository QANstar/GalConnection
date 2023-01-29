import { Button, Form, Input } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import style from './style.module.scss'

function StartCreate () {
  return (
    <div>
      <div className={style.gameFrom}>
        <Form layout="vertical">
          <Form.Item label="游戏名称">
            <Input placeholder="游戏名称" />
          </Form.Item>
          <Form.Item label="介绍">
            <TextArea placeholder="游戏介绍" rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type="primary">Submit</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}

export default StartCreate
