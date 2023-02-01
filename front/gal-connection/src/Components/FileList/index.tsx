import React, { useState } from 'react'
import { FileType } from '../../types/enums'
import { IFile, IRename } from '../../types/type'
import FileListItem from './item'
import style from './style.module.scss'

interface IFileListProps {
  files: IFile[]
  selectMode?: boolean
  onFileClick: (data: IFile, url?: string) => void
  onDeleteClick?: (fileId: number) => void
  onRenameFinsih?: (value: IRename) => void
  onRemoveClick?: (fileId: number) => void
}

function FileList (props: IFileListProps) {
  const [activeFile, setActiveFile] = useState(0)
  return (
    <div className={style.list}>
      {props.files.map((file) => (
        <FileListItem
          isActive={activeFile === file.id}
          selectMode={props.selectMode}
          onRemove={() => {
            if (props.onRemoveClick) props.onRemoveClick(file.id)
          }}
          onDelete={() => {
            if (props.onDeleteClick) props.onDeleteClick(file.id)
          }}
          onRename={(value: IRename) => {
            if (props.onRenameFinsih) props.onRenameFinsih(value)
          }}
          onClick={(data, url) => {
            if (data.type !== FileType.FOLDER) {
              setActiveFile(data.id)
            }
            props.onFileClick(data, url)
          }}
          key={file.id}
          file={file}
        />
      ))}
    </div>
  )
}

export default FileList
