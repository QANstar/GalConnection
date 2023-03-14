import React from 'react'
import { IBackLog } from '../../../types/type'
import style from './style.module.scss'

interface IBackLogItemProps {
  backLogItemData: IBackLog
}

function BackLogItem (props: IBackLogItemProps) {
  const { backLogItemData } = props
  return (
    <div className={style.item}>
      <div className={style.name}>
        {backLogItemData.lines.LinesContent[0].characters}
      </div>
      <div className={style.linesContent}>
        {backLogItemData.lines.LinesContent[0].linesContent1}
      </div>
    </div>
  )
}

export default BackLogItem
