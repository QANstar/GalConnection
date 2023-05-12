import { Modal } from 'antd'
import React, { useState } from 'react'
import useFile from '../../Hooks/useFile'
import useUser from '../../Hooks/useUser'
import { FileType } from '../../types/enums'
import { FilterFileTye, IFile } from '../../types/type'
import FileList from '../FileList'
import FolderTree from '../FolderTree'

import style from './style.module.scss'

interface ICloudeFileSelectProps {
  children: React.ReactNode
  type: FilterFileTye
  onFileSure: (url: string) => void
}

const CloudeFileSelect = (props: ICloudeFileSelectProps) => {
  const { user } = useUser()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [pid, setPid] = useState(0)
  const [groupId, setGroupId] = useState(user.groupId)
  const { files } = useFile({ groupId, pid, type: props.type })
  const [choFile, setChoFile] = useState('')

  const onFileClick = (data: IFile, url?: string) => {
    if (data.type === FileType.FOLDER) {
      setGroupId(data.groupId)
      setPid(data.id)
      setChoFile('')
    } else if (url) {
      setChoFile(url)
    }
  }

  return (
    <div className={style.main}>
      <Modal
        title="选择文件"
        open={isModalOpen}
        onOk={() => {
          if (choFile) {
            props.onFileSure(choFile)
          }
          setIsModalOpen(false)
          setChoFile('')
        }}
        onCancel={() => {
          setIsModalOpen(false)
        }}
        width={1200}
        okText="确认"
        cancelText="取消"
      >
        <div className={style.fileSelect}>
          <div className={style.tree}>
            <FolderTree
              onItemClick={(data) => {
                setGroupId(data.groupId)
                setPid(data.id)
              }}
            />
          </div>

          <FileList selectMode files={files} onFileClick={onFileClick} />
        </div>
      </Modal>
      <div
        onClick={() => {
          setIsModalOpen(true)
        }}
        className={style.clickBtn}
      >
        {props.children}
      </div>
    </div>
  )
}

export default CloudeFileSelect
