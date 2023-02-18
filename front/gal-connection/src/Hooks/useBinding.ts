import { useCallback, useEffect, useState } from 'react'
import { IBinding } from '../types/type'
import * as gameService from '../service/game'
import { message } from 'antd'

const useBinding = (gameId: number) => {
  const [bindingInfo, setBindingInfo] = useState<IBinding[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取绑定信息
  const getBindingInfo = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getBindingInfo({ gameId })
      if (status === 200) {
        setBindingInfo(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId])

  // 编辑绑定
  const editBinding = useCallback(
    async (params: IBinding) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.editBinding(params)
        if (status === 200) {
          getBindingInfo()
          message.success('编辑成功')
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId]
  )

  // 绑定
  const binding = useCallback(
    async (params: IBinding) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.binding(params)
        if (status === 200) {
          getBindingInfo()
          message.success('绑定成功')
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId]
  )

  // 删除绑定
  const delBinding = useCallback(
    async (bindingId: number) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.delBinding({ bindingId })
        if (status === 200) {
          getBindingInfo()
          message.success('删除成功')
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId]
  )

  useEffect(() => {
    getBindingInfo()
  }, [gameId])

  return {
    bindingInfo,
    loading,
    error,
    editBinding,
    getBindingInfo,
    binding,
    delBinding
  }
}

export default useBinding
