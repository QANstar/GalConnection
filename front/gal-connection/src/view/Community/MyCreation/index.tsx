import { Button } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

function MyCreation () {
  return (
    <div className={style.main}>
      <div className={style.startCreate}>
        <div className={style.startCreateText}>来制作并发布你的作品吧</div>
        <Link to="/startCreate">
          <Button type="primary" shape="round" size="large">
            开始创作
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default MyCreation
