import { useCallback, useState } from 'react'
import { IFile, IFolderTree } from '../types/type'
import * as fileService from '../service/file'
import { EGroupType, FileType } from '../types/enums'

const useFolderTree = () => {
  const [folders, setFolders] = useState<IFolderTree[]>([])
  const [error, setError] = useState('')

  // 获取指定文件夹下所有文件夹
  const getChildrenNode = useCallback(
    async (node: IFolderTree) => {
      if (node.data) {
        try {
          setError('')
          const groupId = node.data.groupId
          const pid = node.data.id
          const { data, status } = await fileService.getFoldersByPid({
            groupId,
            pid
          })
          if (status === 200) {
            const result: IFolderTree[] = data.map((item) => {
              return {
                title: item.name,
                key: item.id.toString(),
                data: item
              }
            })
            const resultTree = updateTreeData(folders, result, pid)

            setFolders([...resultTree])
          }
        } catch (e: any) {
          setError(e)
        }
      }
    },
    [folders]
  )

  // 更新树数据
  const updateTreeData = (
    list: IFolderTree[],
    children: IFolderTree[],
    pid: number
  ): IFolderTree[] =>
    list.map((node) => {
      if (node.data && node.data.id === pid) {
        return {
          ...node,
          children
        }
      }
      if (node.children) {
        return {
          ...node,
          children: updateTreeData(node.children, children, pid)
        }
      }
      return node
    })

  // 初始化
  const initFolderTree = async () => {
    try {
      setError('')
      const { data, status } = await fileService.getGroupOfUser()
      if (status === 200) {
        const myGroup = data.find((x) => x.type === EGroupType.SELF)
        const tree: IFolderTree[] = []
        if (myGroup) {
          const myGroupTree: IFolderTree = {
            title: '我的素材',
            key: 'mine',
            data: {
              id: 0,
              name: myGroup.name,
              userId: myGroup.userId,
              type: FileType.FOLDER,
              pid: 0,
              creactTime: myGroup.createTime,
              editTime: myGroup.createTime,
              groupId: myGroup.groupId,
              state: 1
            }
          }
          tree.push(myGroupTree)
        }
        const otherGroup = data.filter((x) => x.type !== EGroupType.SELF)
        const otherGroupTree = otherGroup.map((x) => {
          const item: IFile = {
            id: 0,
            name: x.name,
            userId: x.userId,
            type: FileType.FOLDER,
            pid: 0,
            creactTime: x.createTime,
            editTime: x.createTime,
            groupId: x.groupId,
            state: 1
          }
          return {
            title: item.name,
            key: `other${item.groupId}`,
            data: {
              id: 0,
              name: item.name,
              userId: item.userId,
              type: FileType.FOLDER,
              pid: 0,
              creactTime: item.creactTime,
              editTime: item.creactTime,
              groupId: item.groupId,
              state: 1
            }
          }
        })
        tree.push({
          title: '团队素材',
          key: 'group',
          children: otherGroupTree,
          disabled: true
        })
        setFolders(tree)
      }
    } catch (e: any) {
      setError(e)
    }
  }

  return {
    folders,
    getChildrenNode,
    initFolderTree,
    error
  }
}

export default useFolderTree
