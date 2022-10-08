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
        setError(data)
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
    user,
    error,
    loading
  }
}

export default useUser
