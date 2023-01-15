import {
  CustomerServiceOutlined,
  FolderOutlined,
  PictureOutlined,
  PlaySquareOutlined
} from '@ant-design/icons'
import { Button, Dropdown, Input, MenuProps, Modal } from 'antd'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FileList from '../../../Components/FileList'
import FolderTree from '../../../Components/FolderTree'
import useFile from '../../../Hooks/useFile'
import { FileType } from '../../../types/enums'
import { IFile } from '../../../types/type'
import style from './style.module.scss'

function MyMaterial () {
  const { groupId, pid } = useParams()
  const { files, createFolder } = useFile(parseInt(groupId!), parseInt(pid!))
  const navigate = useNavigate()
  const [isOpenNewFolderModal, setIsOpenNewFolderModal] = useState(false)
  const [folderName, setFolderName] = useState('')

  const onFileClick = (data: IFile) => {
    if (data.type === FileType.FOLDER) {
      navigate(`/myMaterial/${data.groupId}/${data.id}`)
    }
  }

  const items: MenuProps['items'] = [
    {
      label: (
        <div onClick={() => setIsOpenNewFolderModal(true)}>
          <FolderOutlined style={{ marginRight: 10 }} />
          文件夹
        </div>
      ),
      key: '0'
    },
    {
      label: (
        <div>
          <PictureOutlined style={{ marginRight: 10 }} />
          图片
        </div>
      ),
      key: '1'
    },
    {
      label: (
        <div>
          <PlaySquareOutlined style={{ marginRight: 10 }} />
          视频
        </div>
      ),
      key: '3'
    },
    {
      label: (
        <div>
          <CustomerServiceOutlined style={{ marginRight: 10 }} />
          音频
        </div>
      ),
      key: '4'
    }
  ]

  return (
    <div className={style.myMaterial}>
      <Modal
        title="新建文件夹"
        open={isOpenNewFolderModal}
        onOk={() => {
          setIsOpenNewFolderModal(false)
          createFolder(folderName)
          setFolderName('')
        }}
        onCancel={() => {
          setFolderName('')
          setIsOpenNewFolderModal(false)
        }}
        okText="确认"
        cancelText="取消"
      >
        <Input
          style={{ marginTop: 10, marginBottom: 10 }}
          value={folderName}
          onChange={(e) => {
            setFolderName(e.target.value)
          }}
          placeholder="文件夹名称"
        />
      </Modal>
      <header className={style.header}>
        <div className={style.topAction}>
          <Dropdown menu={{ items }} trigger={['click']}>
            <Button className={style.actionBtn} type="primary" shape="round">
              新建
            </Button>
          </Dropdown>
        </div>
        <div>
          <FolderTree />
        </div>
      </header>
      <main className={style.main}>
        <FileList onFileClick={onFileClick} files={files} />
      </main>
    </div>
  )
}

export default MyMaterial
