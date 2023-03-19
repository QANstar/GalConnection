import { useCallback, useState } from 'react'
import { IEditUserInfo, ILogin, IRegister } from '../types/type'
import * as userService from '../service/user'
import { useNavigate } from 'react-router-dom'
import { message } from 'antd'
import store from '../store'

const useUser = () => {
  const { user } = store
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // 注册
  const signup = useCallback(async (params: IRegister) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.signUp(params)
      if (status === 200) {
        navigate('/login')
        message.success('注册成功')
      } else {
        setError(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 登录
  const login = useCallback(async (params: ILogin) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.login(params)
      if (status === 200) {
        user.setToken(data)
        store.signalR.init(data)
        await getSelfInfo()
        navigate('/')
      } else {
        setError(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 获取本人用户信息
  const getSelfInfo = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.getSelfInfo()
      if (status === 200) {
        user.setUser(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 获取用户信息
  const getUserInfo = useCallback(async (userId: number) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.getUserInfo({ userId })
      if (status === 200) {
        return data
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 退出登录
  const logout = useCallback(async () => {
    user.init()
    window.location.href = '/'
  }, [])

  // 编辑用户信息
  const editUserInfo = useCallback(async (params: IEditUserInfo) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.editUserInfo(params)
      if (status === 200) {
        message.success('编辑成功')
        await getSelfInfo()
        return true
      } else {
        setError(data.toString())
        return false
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 上传用户头像
  const avatarUpdate = useCallback(async (params: { url: string }) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.avatarUpdate(params)
      if (status === 200) {
        message.success('修改成功')
        await getSelfInfo()
        return true
      } else {
        setError(data.toString())
        return false
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 上传用户头图
  const bannerUpdate = useCallback(async (params: { url: string }) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.bannerUpdate(params)
      if (status === 200) {
        message.success('修改成功')
        await getSelfInfo()
        return true
      } else {
        setError(data.toString())
        return false
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 关注
  const followUser = useCallback(async (followId: number) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.followUser(followId)
      if (status === 200) {
        message.success('关注成功')
        return true
      } else {
        setError(data.toString())
        return false
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 取消关注
  const unFollowUser = useCallback(async (followId: number) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.unFollowUser(followId)
      if (status === 200) {
        message.success('取消关注成功')
        return true
      } else {
        setError(data.toString())
        return false
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  return {
    signup,
    login,
    logout,
    getSelfInfo,
    getUserInfo,
    editUserInfo,
    avatarUpdate,
    bannerUpdate,
    followUser,
    unFollowUser,
    user,
    error,
    loading
  }
}

export default useUser
