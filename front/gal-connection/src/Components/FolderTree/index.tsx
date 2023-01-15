import { Tree } from 'antd'
import { EventDataNode } from 'antd/es/tree'
import React, { Key, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useFolderTree from '../../Hooks/useFolderTree'
import { IFolderTree } from '../../types/type'

function FolderTree () {
  const { folders, initFolderTree, getChildrenNode } = useFolderTree()
  const navigate = useNavigate()

  const onFolderClick = (
    selectedKeys: Key[],
    info: {
      event: 'select'
      selected: boolean
      node: EventDataNode<IFolderTree>
      selectedNodes: IFolderTree[]
      nativeEvent: MouseEvent
    }
  ) => {
    console.log(selectedKeys)
    if (info.node.data) {
      navigate(`/myMaterial/${info.node.data.groupId}/${info.node.data.id}`)
    }
  }

  useEffect(() => {
    initFolderTree()
  }, [])

  return (
    <div>
      <Tree
        onSelect={onFolderClick}
        loadData={getChildrenNode}
        treeData={folders}
      />
    </div>
  )
}

export default FolderTree
