import { useCallback, useEffect, useState } from 'react'
import { IOptions } from '../types/type'
import * as gameService from '../service/game'
import { message } from 'antd'

const useOption = (gameId: number, eventId?: number) => {
  const [gameOptionsList, setGameOptionsList] = useState<IOptions[]>([])
  const [evnetOptionsList, setEventOptionsList] = useState<IOptions[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取某个游戏所有的选项
  const getOptionsOfgame = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getOptionsOfgame({ gameId })
      if (status === 200) {
        setGameOptionsList(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId])

  // 获取某个事件的选项
  const getOptions = useCallback(async () => {
    if (eventId) {
      try {
        setLoading(true)
        setError('')
        const { data, status } = await gameService.getOptions({ eventId })
        if (status === 200) {
          setEventOptionsList(data)
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    }
  }, [eventId])

  // 删除选项
  const delOption = useCallback(
    async (params: { optionId: number }) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.delOption(params)
        if (status === 200) {
          getOptionsOfgame()
          getOptions()
          message.success('删除成功')
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, eventId]
  )

  // 添加选项
  const addOption = useCallback(
    async (params: IOptions) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.addOption(params)
        if (status === 200) {
          getOptionsOfgame()
          getOptions()
          message.success('添加成功')
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, eventId]
  )

  // 编辑选项内容
  const EditOption = useCallback(
    async (params: IOptions) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.EditOption(params)
        if (status === 200) {
          getOptionsOfgame()
          getOptions()
          message.success('编辑成功')
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, eventId]
  )

  useEffect(() => {
    getOptionsOfgame()
  }, [gameId])

  useEffect(() => {
    getOptions()
  }, [eventId])

  return {
    evnetOptionsList,
    gameOptionsList,
    loading,
    error,
    delOption,
    addOption,
    EditOption
  }
}

export default useOption
