import {
  CustomerServiceOutlined,
  FileFilled,
  FolderFilled
} from '@ant-design/icons'
import { Dropdown, Image, Input, InputRef, MenuProps, Tag } from 'antd'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { getFileUrl } from '../../service/file'
import { FileType } from '../../types/enums'
import { IFile, IRename } from '../../types/type'
import style from './style.module.scss'

interface IFileListItemProps {
  file: IFile
  onClick: (data: IFile, url?: string) => void
  onDelete: () => void
  onRename: (value: IRename) => void
}

function FileListItem (props: IFileListItemProps) {
  const [fileUrl, setFileUrl] = useState('')
  const [imageVisable, setImgVisable] = useState(false)
  const [isRenameMode, setIsRenameMode] = useState(false)
  const [renameValue, setRenameValue] = useState(props.file.name)
  const inputRef = useRef<InputRef>(null)
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
      key: 'open'
    },
    {
      label: '移动',
      key: 'move'
    },
    {
      label: (
        <div
          onClick={() => {
            setIsRenameMode(true)
            setTimeout(() => {
              inputRef.current!.focus({
                cursor: 'all'
              })
            })
          }}
        >
          重命名
        </div>
      ),
      key: 'rename'
    },
    {
      label: <div onClick={props.onDelete}>删除</div>,
      key: 'delete'
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

  // 确定重命名
  const sureRename = () => {
    setIsRenameMode(false)
    props.onRename({ fileId: props.file.id, newName: renameValue })
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
        title={props.file.name}
      >
        <div className={style.tag}>{tagText}</div>
        <div className={style.cover}>{fileElement}</div>

        {!isRenameMode
          ? (
          <div className={style.itemText}>{props.file.name}</div>
            )
          : (
          <div className={style.renameInput}>
            <Input
              value={renameValue}
              onChange={(val) => {
                setRenameValue(val.target.value)
              }}
              onClick={(e) => {
                e.stopPropagation()
              }}
              ref={inputRef}
              size="small"
              placeholder="重命名"
              onPressEnter={sureRename}
              onBlur={sureRename}
            />
          </div>
            )}
      </div>
    </Dropdown>
  )
}

export default FileListItem
