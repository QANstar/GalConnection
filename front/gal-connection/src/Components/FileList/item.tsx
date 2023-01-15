import { FileFilled, FolderFilled } from '@ant-design/icons'
import { Dropdown, MenuProps } from 'antd'
import React from 'react'
import { FileType } from '../../types/enums'
import { IFile } from '../../types/type'
import style from './style.module.scss'

interface IFileListItemProps {
  file: IFile
  onClick: (data: IFile) => void
}

function FileListItem (props: IFileListItemProps) {
  const items: MenuProps['items'] = [
    {
      label: <div onClick={() => props.onClick(props.file)}>打开</div>,
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

  return (
    <Dropdown menu={{ items }} trigger={['contextMenu']}>
      <div onClick={() => props.onClick(props.file)} className={style.item}>
        {props.file.type === FileType.FOLDER
          ? (
          <FolderFilled className={style.fileIcon} />
            )
          : (
          <FileFilled className={style.fileIcon} />
            )}
        <div className={style.itemText}>{props.file.name}</div>
      </div>
    </Dropdown>
  )
}

export default FileListItem
