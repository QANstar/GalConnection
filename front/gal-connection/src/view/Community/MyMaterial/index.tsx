import {
  CustomerServiceOutlined,
  FolderOutlined,
  PictureOutlined,
  PlaySquareOutlined
} from '@ant-design/icons'
import { Button, Dropdown, Input, MenuProps, message, Modal, Spin } from 'antd'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FileList from '../../../Components/FileList'
import FolderTree from '../../../Components/FolderTree'
import OssUpload from '../../../Components/OssUpload'
import useFile from '../../../Hooks/useFile'
import { FileType } from '../../../types/enums'
import JoLPlayer from 'jol-player'
import { IFile, OssFileType } from '../../../types/type'
import style from './style.module.scss'
import MusicPlayer from '../../../Components/MusicPlayer'

function MyMaterial () {
  const { groupId, pid } = useParams()
  const { files, error, loading, createFolder, createFile } = useFile(
    parseInt(groupId!),
    parseInt(pid!)
  )
  const navigate = useNavigate()
  const [isOpenNewFolderModal, setIsOpenNewFolderModal] = useState(false)
  const [folderName, setFolderName] = useState('')
  const [videoVisable, setVideoVisable] = useState(false)
  const [soundVisable, setSoundVisable] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [soundUrl, setSoundUrl] = useState('')
  const videoRef = useRef(null)

  // 文件被点击时
  const onFileClick = (data: IFile, url?: string) => {
    if (data.type === FileType.FOLDER) {
      navigate(`/myMaterial/${data.groupId}/${data.id}`)
    } else if (data.type === FileType.VIDEO) {
      setSoundUrl('')
      setVideoVisable(true)
      if (url && url !== '') {
        setVideoUrl(url)
      }
    } else if (data.type === FileType.SOUND) {
      setSoundVisable(true)
      if (url && url !== '') {
        setSoundUrl(url)
      }
    }
  }

  // 视频关闭时
  const onVideoClose = () => {
    setVideoVisable(false)
    setVideoUrl('')
    if (videoRef.current) (videoRef.current as any).pause()
  }

  // 上传完成时
  const onUploadFinish = (data: { url: string; type: OssFileType }) => {
    let type: string = ''
    if (data.type === OssFileType.Picture) {
      type = FileType.PICTURE
    } else if (data.type === OssFileType.Sound) {
      type = FileType.SOUND
    } else if (data.type === OssFileType.Video) {
      type = FileType.VIDEO
    }
    createFile(
      data.url.split('/')[data.url.split('/').length - 1],
      type,
      data.url
    )
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
          <OssUpload type={OssFileType.Picture} onFinish={onUploadFinish}>
            <div>
              <PictureOutlined style={{ marginRight: 10 }} />
              图片
            </div>
          </OssUpload>
        </div>
      ),
      key: '1'
    },
    {
      label: (
        <OssUpload type={OssFileType.Video} onFinish={onUploadFinish}>
          <div>
            <PlaySquareOutlined style={{ marginRight: 10 }} />
            视频
          </div>
        </OssUpload>
      ),
      key: '3'
    },
    {
      label: (
        <OssUpload type={OssFileType.Sound} onFinish={onUploadFinish}>
          <div>
            <CustomerServiceOutlined style={{ marginRight: 10 }} />
            音频
          </div>
        </OssUpload>
      ),
      key: '4'
    }
  ]

  useEffect(() => {
    if (error !== '') {
      message.error(error)
    }
  }, [error])

  return (
    <div className={style.myMaterial}>
      <Modal
        width={1000}
        title="视频播放"
        open={videoVisable}
        onOk={onVideoClose}
        onCancel={onVideoClose}
      >
        <div className={style.playerModal}>
          {videoUrl !== '' && (
            <JoLPlayer
              ref={videoRef}
              option={{
                videoSrc: videoUrl,
                width: 750,
                height: 420
              }}
            />
          )}
        </div>
      </Modal>
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
      <MusicPlayer
        visable={soundVisable}
        onShow={() => setSoundVisable(true)}
        onHidden={() => setSoundVisable(false)}
        url={soundUrl}
      />
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
        {loading
          ? (
          <div className={style.spin}>
            <Spin tip="Loading" size="large" />
          </div>
            )
          : (
          <FileList onFileClick={onFileClick} files={files} />
            )}
      </main>
    </div>
  )
}

export default MyMaterial
