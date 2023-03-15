import { useCallback, useEffect, useState } from 'react'
import { IUser } from '../types/type'
import * as userService from '../service/user'
import { message } from 'antd'

type UserListType = 'search' | 'follows' | 'fans'

interface IUserRequestData {
  searchContent?: string
  userId?: number
}

const limit = 12

const useUserList = (type: UserListType, reqData?: IUserRequestData) => {
  const [userList, setUserList] = useState<IUser[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 搜索用户
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

  // 获取用户关注列表
  const getFollows = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.getFollows(
        reqData?.userId || 0,
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
  }, [reqData?.userId, limit, page])

  // 获取粉丝列表
  const getFans = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.getFans(
        reqData?.userId || 0,
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
  }, [reqData?.userId, limit, page])

  // 关注
  const followUser = useCallback(
    async (followId: number) => {
      try {
        setLoading(true)
        setError('')
        const { data, status } = await userService.followUser(followId)
        if (status === 200) {
          message.success('关注成功')
          const user = userList.find((x) => x.id === followId)
          if (user) {
            user.isFollow = true
            setUserList([...userList])
          }
        } else {
          setError(data.toString())
          return false
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [userList]
  )

  // 取消关注
  const unFollowUser = useCallback(
    async (followId: number) => {
      try {
        setLoading(true)
        setError('')
        const { data, status } = await userService.unFollowUser(followId)
        if (status === 200) {
          message.success('取消关注成功')
          const user = userList.find((x) => x.id === followId)
          if (user) {
            user.isFollow = false
            setUserList([...userList])
          }
        } else {
          setError(data.toString())
          return false
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [userList]
  )

  useEffect(() => {
    if (type === 'search' && reqData?.searchContent) {
      searchUser()
    } else if (type === 'follows' && reqData?.userId) {
      getFollows()
    } else if (type === 'fans' && reqData?.userId) {
      getFans()
    }
  }, [reqData?.searchContent, reqData?.userId, limit, page, type])

  return {
    userList,
    loading,
    error,
    page,
    total,
    limit,
    setPage,
    followUser,
    unFollowUser
  }
}

export default useUserList
