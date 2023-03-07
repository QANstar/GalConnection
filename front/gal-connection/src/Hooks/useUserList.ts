import { useCallback, useEffect, useState } from 'react'
import { IUser } from '../types/type'
import * as userService from '../service/user'

interface IUserRequestData {
  searchContent?: string
}

const limit = 12

const useUserList = (reqData?: IUserRequestData) => {
  const [userList, setUserList] = useState<IUser[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取指定文件夹下所有文件
  const searchUser = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.searchUser(
        reqData?.searchContent || '',
        (page - 1) * limit,
        limit
      )
      if (status === 200) {
        setUserList(data.users)
        setTotal(data.total)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [reqData?.searchContent, limit, page])

  useEffect(() => {
    searchUser()
  }, [reqData?.searchContent, limit, page])

  return {
    userList,
    loading,
    error,
    page,
    total,
    limit,
    setPage
  }
}

export default useUserList
