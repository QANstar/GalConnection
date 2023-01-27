import { useCallback, useEffect, useState } from 'react'
import { FilterFileTye, IFile, IFolderInfo, IRename } from '../types/type'
import * as fileService from '../service/file'
import { FileType } from '../types/enums'

const useFile = (groupId: number, pid: number, type: FilterFileTye) => {
  const [files, setFiles] = useState<IFile[]>([])
  const [folderInfo, setFolderInfo] = useState<IFolderInfo | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取指定文件夹下所有文件
  const getFiles = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await fileService.getFiles({
        groupId,
        pid
      })
      if (status === 200) {
        setFiles(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [groupId, pid])

  // 根据文件类型获取指定文件夹下所有文件
  const getFilesByType = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await fileService.getFilesByType({
        groupId,
        pid,
        type
      })
      if (status === 200) {
        setFiles(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [groupId, pid, type])

  // 创建文件夹
  const createFolder = useCallback(
    async (name: string) => {
      try {
        setError('')
        const { status, data } = await fileService.createFolder({
          groupId,
          pid,
          type: FileType.FOLDER,
          name
        })
        if (status === 200) {
          getFiles()
        } else {
          setError(data.toString())
        }
      } catch (e: any) {
        setError(e)
      }
    },
    [groupId, pid]
  )

  // 创建文件
  const createFile = useCallback(
    async (name: string, type: string, link: string) => {
      try {
        setError('')
        const { status, data } = await fileService.createFile({
          groupId,
          pid,
          type,
          name,
          link
        })
        if (status === 200) {
          getFiles()
        } else {
          setError(data.toString())
        }
      } catch (e: any) {
        setError(e)
      }
    },
    [groupId, pid]
  )

  // 重命名
  const rename = useCallback(
    async (value: IRename) => {
      try {
        setError('')
        const { status, data } = await fileService.rename(value)
        if (status === 200) {
          const file = files.find((x) => x.id === value.fileId)
          if (file) {
            file.name = value.newName
          }
          setFiles([...files])
        } else {
          setError(data.toString())
        }
      } catch (e: any) {
        setError(e)
      }
    },
    [groupId, pid, files]
  )

  // 移动文件
  const moveFolder = useCallback(
    async (value: { fileId: number; folderId: number }) => {
      try {
        setError('')
        const { status, data } = await fileService.moveFolder(value)
        if (status === 200) {
          getFiles()
        } else {
          setError(data.toString())
        }
      } catch (e: any) {
        setError(e)
      }
    },
    [groupId, pid]
  )

  // 删除文件
  const delFile = useCallback(
    async (fileId: number) => {
      try {
        setError('')
        const { status, data } = await fileService.delFile(fileId)
        if (status === 200) {
          getFiles()
        } else {
          setError(data.toString())
        }
      } catch (e: any) {
        setError(e)
      }
    },
    [groupId, pid]
  )

  // 获取文件夹信息
  const getFolderInfo = useCallback(async () => {
    try {
      setError('')
      const { status, data } = await fileService.getFolderInfo({
        groupId,
        fileId: pid
      })
      if (status === 200) {
        setFolderInfo(data)
      } else {
        setError(data.toString())
      }
    } catch (e: any) {
      setError(e)
    }
  }, [groupId, pid])

  useEffect(() => {
    getFilesByType()
    getFolderInfo()
  }, [groupId, pid, type])

  return {
    files,
    loading,
    folderInfo,
    delFile,
    getFolderInfo,
    getFiles,
    createFolder,
    createFile,
    getFilesByType,
    rename,
    moveFolder,
    error
  }
}

export default useFile
