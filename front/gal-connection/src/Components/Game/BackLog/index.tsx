import { ExclamationCircleFilled } from '@ant-design/icons'
import { Drawer, Modal } from 'antd'
import React from 'react'
import { IBackLog, IGameState } from '../../../types/type'
import ActionBtn from '../SaveAndLoad/ActionBtn'
import BackLogItem from './item'
import style from './style.module.scss'
const { confirm } = Modal

interface IBackLogProps {
  open: boolean
  onClose: () => void
  backLogData: IBackLog[]
  onJumpClick: (gameState: IGameState) => void
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
            <BackLogItem
              onJumpClick={() => {
                confirm({
                  title: '确定跳跃到此处?',
                  icon: <ExclamationCircleFilled />,
                  onOk () {
                    props.onJumpClick(item.gameState)
                    props.onClose()
                  },
                  okText: '确定',
                  cancelText: '取消'
                })
              }}
              key={item.lines.id}
              backLogItemData={item}
            />
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
