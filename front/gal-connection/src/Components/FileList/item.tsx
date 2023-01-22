import {
  CustomerServiceOutlined,
  FileFilled,
  FolderFilled
} from '@ant-design/icons'
import { Dropdown, Image, MenuProps, Tag } from 'antd'
import React, { useEffect, useMemo, useState } from 'react'
import { getFileUrl } from '../../service/file'
import { FileType } from '../../types/enums'
import { IFile } from '../../types/type'
import style from './style.module.scss'

interface IFileListItemProps {
  file: IFile
  onClick: (data: IFile, url?: string) => void
}

function FileListItem (props: IFileListItemProps) {
  const [fileUrl, setFileUrl] = useState('')
  const [imageVisable, setImgVisable] = useState(false)
  const items: MenuProps['items'] = [
    {
      label: (
        <div
          onClick={() => {
            setImgVisable(true)
            props.onClick(props.file, fileUrl)
          }}
        >
          打开
        </div>
      ),
      key: '1'
    },
    {
      label: '移动',
      key: '2'
    },
    {
      label: '删除',
      key: '3'
    }
  ]

  const getUrl = async () => {
    try {
      const { data, status } = await getFileUrl({
        groupId: props.file.groupId,
        fileId: props.file.id
      })
      if (status === 200) {
        setFileUrl(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const tagText = useMemo(() => {
    if (props.file.type === FileType.PICTURE) {
      return <Tag color="lime">图片</Tag>
    } else if (props.file.type === FileType.VIDEO) {
      return <Tag color="orange">视频</Tag>
    } else if (props.file.type === FileType.SOUND) {
      return <Tag color="geekblue">音频</Tag>
    } else {
      return ''
    }
  }, [props.file])

  const fileElement = useMemo(() => {
    if (props.file.type === FileType.FOLDER) {
      return <FolderFilled className={style.fileIcon} />
    } else if (props.file.type === FileType.PICTURE) {
      return (
        <Image
          className={style.imgStyle}
          src={`${fileUrl}?x-oss-process=style/low`}
          preview={{
            visible: imageVisable,
            src: fileUrl,
            onVisibleChange: (value) => {
              setImgVisable(value)
            }
          }}
        />
      )
    } else if (props.file.type === FileType.VIDEO) {
      return (
        <img
          className={style.imgStyle}
          src={`${fileUrl}?x-oss-process=video/snapshot,t_1000,m_fast`}
          alt="视频预览图"
        />
      )
    } else if (props.file.type === FileType.SOUND) {
      return <CustomerServiceOutlined className={style.musicIcon} />
    } else {
      return <FileFilled className={style.fileIcon} />
    }
  }, [props.file, fileUrl, imageVisable])

  useEffect(() => {
    getUrl()
  }, [])

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div
        onClick={() => {
          setImgVisable(true)
          props.onClick(props.file, fileUrl)
        }}
        className={style.item}
      >
        <div className={style.tag}>{tagText}</div>
        <div className={style.cover}>{fileElement}</div>
        <div className={style.itemText}>{props.file.name}</div>
      </div>
    </Dropdown>
  )
}

export default FileListItem
