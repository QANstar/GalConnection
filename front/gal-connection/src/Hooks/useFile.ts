import { useCallback, useState } from 'react'
import { IFile } from '../types/type'
import * as fileService from '../service/file'

const useFile = () => {
  const [files, setFiles] = useState<IFile[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取指定文件夹下所有文件夹
  const getFoldersByPid = useCallback(async (groupId: number, pid: number) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await fileService.getFoldersByPid({
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
  }, [])

  return {
    files,
    getFoldersByPid,
    loading,
    error
  }
}

export default useFile
