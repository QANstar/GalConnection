import { useCallback, useState } from 'react'
import { ILogin, IRegister } from '../types/type'
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
  const getUserInfo = useCallback(async (nickname: string) => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await userService.getUserInfo({ nickname })
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

  return {
    signup,
    login,
    logout,
    getSelfInfo,
    getUserInfo,
    user,
    error,
    loading
  }
}

export default useUser
