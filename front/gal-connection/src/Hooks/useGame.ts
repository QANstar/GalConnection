import { useCallback, useEffect, useState } from 'react'
import { IEdge, IEvent, ILines, IOptions } from '../types/type'
import * as gameService from '../service/game'

const useGame = (gameId: number) => {
  const [events, setEvents] = useState<IEvent[]>([])
  const [edges, setEdges] = useState<IEdge[]>([])
  const [lines, setLines] = useState<ILines[]>([])
  const [linesNow, setLinesNow] = useState<ILines>()
  const [evnetNow, setEventNow] = useState<IEvent>()
  const [options, setOptions] = useState<IOptions[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 通过游戏id获取创建游戏信息
  const getGamePlayData = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getGamePlayData({ gameId })
      if (status === 200) {
        setEvents(data.events)
        setEdges(data.edges)
        setLines(data.lines)
        setOptions(data.options)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId])

  // 设置初始台词
  const initLinesNow = useCallback(async () => {
    if (linesNow === undefined) {
      const startEvent = events.find((event) => event.isStartEvent)
      if (!startEvent) return
      setEventNow(startEvent)
      const firstLines = lines.find(
        (item) => item.pre === 0 && item.eventId === startEvent.id
      )
      setLinesNow(firstLines)
    }
  }, [gameId, events, lines])

  // 下一句台词
  const nextLines = useCallback(async () => {
    if (linesNow) {
      if (linesNow.next === 0) {
        changeEvent()
      } else {
        const nextLines = lines.find((x) => x.id === linesNow.next)
        setLinesNow(nextLines)
      }
    } else {
      changeEvent()
    }
  }, [gameId, events, lines, edges, linesNow, evnetNow])

  // 切换事件
  const changeEvent = () => {
    const nextEventIds = edges.filter((x) => x.source === evnetNow?.id)
    if (nextEventIds.length <= 0) return
    const nextEvent = events.find((x) => x.id === nextEventIds[0].target)
    if (!nextEvent) return
    setEventNow(nextEvent)
    const nextLines = lines.find(
      (item) => item.pre === 0 && item.eventId === nextEvent.id
    )
    setLinesNow(nextLines)
  }

  useEffect(() => {
    getGamePlayData()
  }, [gameId])

  useEffect(() => {
    initLinesNow()
  }, [gameId, events, lines])

  return {
    loading,
    error,
    linesNow,
    options,
    edges,
    evnetNow,
    nextLines
  }
}

export default useGame
