import { Empty, Tag } from 'antd'
import React from 'react'
import { ISave } from '../../../../types/type'
import { formatTime } from '../../../../Utils/TimeUtils'
import style from './style.module.scss'

interface ISaveItemProps {
  item?: ISave
  index: number
  isSave?: boolean
}

function SaveItem (props: ISaveItemProps) {
  const { item, isSave } = props
  return (
    <div className={isSave ? style.saveItem : style.loadItem}>
      {item
        ? (
        <>
          <div>
            <img src={item.img} alt="存档预览" />
          </div>
          <div>
            <div>{item.eventName}</div>
            <div>{item.linesContent}</div>
            <div>{formatTime(item.saveTime)}</div>
          </div>
        </>
          )
        : (
        <div className={style.empty}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
          )}
      <Tag className={style.tag} color={props.isSave ? '#ff85c0' : '#4096ff'}>
        {props.index}
      </Tag>
    </div>
  )
}

export default SaveItem
