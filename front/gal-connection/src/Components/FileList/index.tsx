import React from 'react'
import { IFile } from '../../types/type'
import FileListItem from './item'
import style from './style.module.scss'

interface IFileListProps {
  files: IFile[]
  onFileClick: (data: IFile, url?: string) => void
}

function FileList (props: IFileListProps) {
  return (
    <div className={style.list}>
      {props.files.map((file) => (
        <FileListItem
          onClick={(data, url) => props.onFileClick(data, url)}
          key={file.id}
          file={file}
        />
      ))}
    </div>
  )
}

export default FileList
