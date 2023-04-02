import { Skeleton } from 'antd'
import React from 'react'
import style from './style.module.scss'

function LoadingItem () {
  return (
    <div className={style.main}>
      <Skeleton.Image className={style.image} active />
      <div className={style.content}>
        <Skeleton active avatar paragraph={{ rows: 1 }} />
      </div>
    </div>
  )
}

export default LoadingItem
