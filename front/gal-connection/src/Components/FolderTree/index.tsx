import { Tree } from 'antd'
import { EventDataNode } from 'antd/es/tree'
import React, { Key, useEffect } from 'react'
import useFolderTree from '../../Hooks/useFolderTree'
import { IFile, IFolderTree } from '../../types/type'

interface IFolderTreeProps {
  onItemClick: (data: IFile) => void
}

function FolderTree (props: IFolderTreeProps) {
  const { folders, initFolderTree, getChildrenNode } = useFolderTree()

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
      props.onItemClick(info.node.data)
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
