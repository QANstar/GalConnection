import { CloseCircleOutlined } from '@ant-design/icons'
import React from 'react'
import style from './style.module.scss'

interface IImgSelectShowProps {
  url: string
  onDelClick: () => void
}

function ImgSelectShow (props: IImgSelectShowProps) {
  return (
    <div className={style.main}>
      <img className={style.img} src={props.url} alt={props.url} />
      <div onClick={props.onDelClick} className={style.mask}>
        <CloseCircleOutlined style={{ color: '#fff', fontSize: 40 }} />
      </div>
    </div>
  )
}

export default ImgSelectShow
