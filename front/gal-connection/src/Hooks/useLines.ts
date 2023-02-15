import { useCallback, useEffect, useState } from 'react'
import * as gameService from '../service/game'
import { ILines } from '../types/type'

interface IUseLines {
  gameId: number
  eventId: number
  linesId: number
}

const useLines = (params: IUseLines) => {
  const { gameId, eventId, linesId } = params
  const [lines, setLines] = useState<ILines>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取指定文件夹下所有文件
  const getLines = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getLines({
        gameId,
        eventId,
        linesId
      })
      if (status === 200) {
        setLines(data)
      } else {
        setLines(undefined)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId, eventId, linesId])

  // 创建第一个台词
  const createFirstLines = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { status } = await gameService.createFirstLines({
        eventId,
        background: '',
        backgroundStyle: '',
        bgm: '',
        LinesContent: [],
        LinesVoice: [],
        LinesChara: []
      })
      if (status === 200) {
        getLines()
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId, eventId, linesId])

  useEffect(() => {
    getLines()
  }, [gameId, eventId, linesId])

  return {
    lines,
    loading,
    error,
    getLines,
    createFirstLines
  }
}

export default useLines
