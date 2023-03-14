import { ExportOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { IBackLog } from '../../../types/type'
import style from './style.module.scss'

interface IBackLogItemProps {
  backLogItemData: IBackLog
  onJumpClick: () => void
}

function BackLogItem (props: IBackLogItemProps) {
  const { backLogItemData } = props
  return (
    <div className={style.item}>
      <div className={style.itemLeft}>
        <div className={style.name}>
          {backLogItemData.lines.LinesContent[0].characters}
        </div>
        <div className={style.linesContent}>
          {backLogItemData.lines.LinesContent[0].linesContent1}
        </div>
      </div>
      <div className={style.itemRight}>
        <Button onClick={props.onJumpClick} icon={<ExportOutlined />} />
      </div>
    </div>
  )
}

export default BackLogItem
