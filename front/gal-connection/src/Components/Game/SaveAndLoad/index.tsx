import { ExclamationCircleFilled } from '@ant-design/icons'
import { Drawer, Modal, Pagination } from 'antd'
import React, { useState } from 'react'
import { ISave } from '../../../types/type'
import ActionBtn from './ActionBtn'
import SaveList from './SaveList'
import style from './style.module.scss'
const { confirm } = Modal

interface ISaveAndLoadProps {
  gameRef: React.RefObject<HTMLDivElement>
  open: boolean
  onClose: () => void
  isSave?: boolean
  setIsSave?: (isSave: boolean) => void
  saveList: ISave[]
  onSave?: (index: number) => void
  onLoad?: (data: ISave) => void
}

function SaveAndLoad (props: ISaveAndLoadProps) {
  const [page, setPage] = useState(1)

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
      <div className={style.savePage}>
        <div className={style.top}>
          <div className={style.title}>
            <div
              style={props.isSave ? { opacity: 0 } : { opacity: 1 }}
              className={style.titltText}
            >
              <span>LOAD</span>
            </div>
            <div
              style={
                props.isSave
                  ? { opacity: 1, color: '#ff85c0' }
                  : { opacity: 0, color: '#ff85c0' }
              }
              className={style.titltText}
            >
              <span>SAVE</span>
            </div>
          </div>
          <div className={style.page}>
            <Pagination
              defaultCurrent={page}
              total={100}
              onChange={(val) => {
                setPage(val)
              }}
              showSizeChanger={false}
            />
          </div>
        </div>
        <div className={style.content}>
          <SaveList
            onItemSaveClick={(index, isSaved) => {
              if (props.onSave) {
                confirm({
                  title: isSaved ? '确定覆盖此存档?' : '确定在此处存档？',
                  icon: <ExclamationCircleFilled />,
                  onOk () {
                    props.onSave!(index)
                  },
                  okText: '确定',
                  cancelText: '取消'
                })
              }
            }}
            onItemLoadClick={(val) => {
              if (props.onLoad) {
                confirm({
                  title: '确定加载此存档?',
                  icon: <ExclamationCircleFilled />,
                  onOk () {
                    props.onLoad!(val)
                  },
                  okText: '确定',
                  cancelText: '取消'
                })
              }
            }}
            isSave={props.isSave}
            page={page}
            list={props.saveList}
          />
        </div>
        <div className={style.bottom}>
          <ActionBtn
            onClick={() => {
              if (props.setIsSave) props.setIsSave(false)
            }}
            isActive={!props.isSave}
            title="读档"
            subTitle="LOAD"
          />
          <ActionBtn
            onClick={() => {
              if (props.setIsSave) props.setIsSave(true)
            }}
            isActive={props.isSave}
            title="存档"
            subTitle="SAVE"
          />
          <ActionBtn
            onClick={() => {
              props.onClose()
            }}
            title="返回"
            subTitle="BACK"
          />
        </div>
      </div>
    </Drawer>
  )
}

export default SaveAndLoad
