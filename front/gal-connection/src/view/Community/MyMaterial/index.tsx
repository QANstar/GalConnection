import { Tree } from 'antd'
import React, { useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import useFolderTree from '../../../Hooks/useFolderTree'
// import style from './style.module.scss'

function MyMaterial () {
  // const { groupId, pid } = useParams()
  const { folders, initFolderTree, getChildrenNode } = useFolderTree()

  useEffect(() => {
    initFolderTree()
  }, [])

  return (
    <div>
      <Tree loadData={getChildrenNode} treeData={folders} />
    </div>
  )
}

export default MyMaterial
