import { useCallback, useEffect, useState } from 'react'
import {
  IAddEvent,
  IEdge,
  IEditEvent,
  IEditEventPosition,
  IEvent
} from '../types/type'
import * as gameService from '../service/game'
import { message } from 'antd'

const useEvent = (gameId: number) => {
  const [evnets, setEvents] = useState<IEvent[]>([])
  const [choEvent, setChoEvent] = useState<IEvent>()
  const [edges, setEdges] = useState<IEdge[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 通过游戏id获取事件列表
  const setEvent = useCallback(
    async (event: IEditEvent) => {
      const findEvent = evnets.find((x) => x.id === event.id)
      if (findEvent) {
        findEvent.endType = event.endType
        findEvent.enterCondition = event.enterCondition.join(',')
        findEvent.eventName = event.eventName
        findEvent.video = event.video
        setEvents([...evnets])
      }
    },
    [evnets]
  )

  // 通过游戏id获取事件列表
  const getEventList = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getEventList(gameId)
      if (status === 200) {
        setEvents(data.events)
        setEdges(data.edges)
        const rootEvent = data.events.find((x) => x.isStartEvent)
        setChoEvent(rootEvent)
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

  // 删除事件
  const delEvnet = useCallback(
    async (evnetId: number) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.delEvent(evnetId)
        if (status === 200) {
          getEventList()
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

  // 编辑事件
  const editEvent = useCallback(
    async (params: IEditEvent) => {
      try {
        setLoading(true)
        setError('')
        const { data, status } = await gameService.editEvent(params)
        if (status === 200) {
          const newEvents = evnets.find((x) => x.id === data.id)
          if (newEvents) {
            newEvents.endType = data.endType
            newEvents.EventTreeViewData = data.EventTreeViewData
            newEvents.enterCondition = data.enterCondition
            newEvents.eventName = data.eventName
          }
          setEvents([...evnets])
          message.success('保存编辑成功')
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, evnets, edges]
  )

  // 设置选中的事件
  const eventCho = useCallback(
    async (id: string) => {
      const event = evnets.find((x) => x.id === parseInt(id))
      if (event) {
        setChoEvent(event)
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
    choEvent,
    addEvent,
    editEventPosition,
    addEdge,
    eventCho,
    delEvnet,
    editEvent,
    setEvent
  }
}

export default useEvent
