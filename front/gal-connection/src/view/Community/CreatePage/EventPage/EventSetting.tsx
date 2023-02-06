import { DeleteOutlined, SaveOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import style from './style.module.scss'

function EventSetting () {
  return (
    <div className={style.settingContain}>
      <header className={style.settingHeader}>
        <Button
          className="blueBtn"
          size="large"
          icon={<SaveOutlined />}
        ></Button>
        <Button size="large" danger icon={<DeleteOutlined />}></Button>
      </header>
    </div>
  )
}

export default EventSetting
