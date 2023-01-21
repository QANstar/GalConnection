import { useCallback, useEffect, useState } from 'react'
import { IFile } from '../types/type'
import * as fileService from '../service/file'
import { FileType } from '../types/enums'

const useFile = (groupId: number, pid: number) => {
  const [files, setFiles] = useState<IFile[]>([])
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

  useEffect(() => {
    getFiles()
  }, [groupId, pid])

  return {
    files,
    loading,
    getFiles,
    createFolder,
    createFile,
    error
  }
}

export default useFile
