import { Button } from 'antd'
import React from 'react'
import style from './style.module.scss'

function MyCreation () {
  return (
    <div className={style.main}>
      <div className={style.startCreate}>
        <div className={style.startCreateText}>来制作并发布你的作品吧</div>
        <Button type="primary" shape="round" size="large">
          开始创作
        </Button>
      </div>
    </div>
  )
}

export default MyCreation
