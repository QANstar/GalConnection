import { Drawer } from 'antd'
import React from 'react'
import { IBackLog } from '../../../types/type'
import ActionBtn from '../SaveAndLoad/ActionBtn'
import BackLogItem from './item'
import style from './style.module.scss'

interface IBackLogProps {
  open: boolean
  onClose: () => void
  backLogData: IBackLog[]
}

function BackLog (props: IBackLogProps) {
  return (
    <Drawer
      height="100vh"
      onClose={props.onClose}
      title={null}
      closable={false}
      placement="bottom"
      open={props.open}
      className={style.drawer}
    >
      <div className={style.content}>
        <div className={style.list}>
          {props.backLogData.map((item) => (
            <BackLogItem key={item.lines.id} backLogItemData={item} />
          ))}
        </div>
        <div className={style.bottom}>
          <ActionBtn title="返回" subTitle="BACK" onClick={props.onClose} />
        </div>
      </div>
    </Drawer>
  )
}

export default BackLog
