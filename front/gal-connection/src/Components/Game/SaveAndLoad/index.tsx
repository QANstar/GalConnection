import { Button, Drawer, Pagination } from 'antd'
import { toJpeg } from 'html-to-image'
import React, { useCallback, useState } from 'react'
import { ISave } from '../../../types/type'
import ActionBtn from './ActionBtn'
import SaveList from './SaveList'
import style from './style.module.scss'

interface ISaveAndLoadProps {
  gameRef: React.RefObject<HTMLDivElement>
  open: boolean
  onClose: () => void
  isSave?: boolean
  setIsSave?: (isSave: boolean) => void
  saveList: ISave[]
}

function SaveAndLoad (props: ISaveAndLoadProps) {
  const [page, setPage] = useState(1)
  const onSaveClick = useCallback(() => {
    if (props.gameRef.current === null) {
      return
    }

    toJpeg(props.gameRef.current, { quality: 0.95 }).then(function (dataUrl) {
      const img = new Image()
      img.src = dataUrl
      console.log(img)
    })
  }, [props.gameRef])

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
          <SaveList isSave={props.isSave} page={page} list={props.saveList} />
          <Button onClick={onSaveClick}></Button>
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
