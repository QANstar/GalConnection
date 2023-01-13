import React, { useEffect } from 'react'
import useFile from '../../Hooks/useFile'
import style from './style.module.scss'

interface IFolderTreeProps {
  groupId: number
  pid: number
}

const FolderTree = (props: IFolderTreeProps) => {
  const { getFoldersByPid } = useFile()

  useEffect(() => {
    getFoldersByPid(props.groupId, props.pid)
  }, [])
  return <div className={style.main}></div>
}

export default FolderTree
