import { useCallback, useEffect, useState } from 'react'
import { IAddEvent, IEdge, IEditEventPosition, IEvent } from '../types/type'
import * as gameService from '../service/game'

const useEvent = (gameId: number) => {
  const [evnets, setEvents] = useState<IEvent[]>([])
  const [edges, setEdges] = useState<IEdge[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 通过游戏id获取事件列表
  const getEventList = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getEventList(gameId)
      if (status === 200) {
        setEvents(data.events)
        setEdges(data.edges)
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
          evnets.push(data.eventShow)
          edges.push(data.edge)
          setEvents([...evnets])
          setEdges([...edges])
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, evnets, edges]
  )

  // 添加边
  const addEdge = useCallback(
    async (params: IEdge) => {
      try {
        setLoading(true)
        setError('')
        const { data, status } = await gameService.addEdge(params)
        if (status === 200) {
          edges.push(data)
          setEdges([...edges])
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, evnets, edges]
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
    [gameId, evnets, edges]
  )

  useEffect(() => {
    getEventList()
  }, [gameId])

  return {
    evnets,
    edges,
    loading,
    error,
    addEvent,
    editEventPosition,
    addEdge
  }
}

export default useEvent
