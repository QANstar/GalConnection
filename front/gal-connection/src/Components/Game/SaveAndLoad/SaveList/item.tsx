import { Empty, Tag } from 'antd'
import React from 'react'
import { ISave } from '../../../../types/type'
import { formatTime } from '../../../../Utils/TimeUtils'
import style from './style.module.scss'

interface ISaveItemProps {
  item?: ISave
  index: number
  isSave?: boolean
  onClick: () => void
}

function SaveItem (props: ISaveItemProps) {
  const { item, isSave } = props
  return (
    <div
      onClick={() => props.onClick()}
      className={isSave ? style.saveItem : style.loadItem}
    >
      {item
        ? (
        <>
          <div
            className={style.cover}
            style={{
              backgroundImage: `url(${item.img}?x-oss-process=style/low)`
            }}
          ></div>
          <div>
            <div className={style.event}>{item.eventName}</div>
            <div className={style.linescontent}>
              {'[ '}
              {item.linesContent}
              {' ]'}
            </div>
            <div className={style.time}>{formatTime(item.saveTime!)}</div>
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
