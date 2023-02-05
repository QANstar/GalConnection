import { useCallback, useEffect, useState } from 'react'
import { IAddEvent, IEditEventPosition, IEvent } from '../types/type'
import * as gameService from '../service/game'

const useEvent = (gameId: number) => {
  const [evnets, setEvents] = useState<IEvent[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 通过游戏id获取事件列表
  const getEventList = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getEventList(gameId)
      if (status === 200) {
        setEvents(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId])

  // 添加事件
  const addEvent = useCallback(
    async (params: IAddEvent) => {
      try {
        setLoading(true)
        setError('')
        const { data, status } = await gameService.addEvent(params)
        if (status === 200) {
          evnets.push(data)
          setEvents([...evnets])
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, evnets]
  )

  // 编辑事件在树视图中位置
  const editEventPosition = useCallback(
    async (params: IEditEventPosition) => {
      const event = evnets.find((x) => x.id === params.eventid)
      if (event?.EventTreeViewData.position !== params.position) {
        try {
          setLoading(true)
          setError('')
          const { data, status } = await gameService.editEventPosition(params)
          if (status === 200) {
            if (event) event.EventTreeViewData.position = data
            setEvents([...evnets])
          }
        } catch (e: any) {
          setError(e)
        } finally {
          setLoading(false)
        }
      }
    },
    [gameId, evnets]
  )

  useEffect(() => {
    getEventList()
  }, [gameId])

  return {
    evnets,
    loading,
    error,
    addEvent,
    editEventPosition
  }
}

export default useEvent
