import React from 'react'
import { IFile, IRename } from '../../types/type'
import FileListItem from './item'
import style from './style.module.scss'

interface IFileListProps {
  files: IFile[]
  onFileClick: (data: IFile, url?: string) => void
  onDeleteClick: (fileId: number) => void
  onRenameFinsih: (value: IRename) => void
  onRemoveClick: (fileId: number) => void
}

function FileList (props: IFileListProps) {
  return (
    <div className={style.list}>
      {props.files.map((file) => (
        <FileListItem
          onRemove={() => props.onRemoveClick(file.id)}
          onDelete={() => props.onDeleteClick(file.id)}
          onRename={props.onRenameFinsih}
          onClick={(data, url) => props.onFileClick(data, url)}
          key={file.id}
          file={file}
        />
      ))}
    </div>
  )
}

export default FileList
