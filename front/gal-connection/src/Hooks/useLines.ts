import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import * as gameService from '../service/game'
import { ILines, ILinesBackground } from '../types/type'

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
        gameId,
        LinesBackground: {
          isCG: false,
          background: '',
          style: '',
          bindingId: 0,
          materialId: 0
        },
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

  // 编辑台词
  const editLines = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      if (lines) {
        const { status } = await gameService.editLines(lines)
        if (status === 200) {
          getLines()
          message.success('编辑成功')
        }
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId, eventId, linesId, lines])

  // 修改说话的角色
  const setSpeakChara = useCallback(
    async (chara: string) => {
      if (lines) {
        if (lines.LinesContent.length > 0) {
          lines.LinesContent[0].characters = chara
          setLines({ ...lines })
        }
      }
    },
    [gameId, eventId, linesId, lines]
  )

  // 修改说话的台词
  const setSpeakLines = useCallback(
    async (speakLines: string) => {
      if (lines) {
        if (lines.LinesContent.length > 0) {
          lines.LinesContent[0].linesContent1 = speakLines
          setLines({ ...lines })
        }
      }
    },
    [gameId, eventId, linesId, lines]
  )

  // 修改背景
  const setBackground = useCallback(
    async (background: ILinesBackground) => {
      if (lines) {
        lines.LinesBackground = background
        setLines({ ...lines })
      }
    },
    [gameId, eventId, linesId, lines]
  )

  useEffect(() => {
    getLines()
  }, [gameId, eventId, linesId])

  return {
    lines,
    loading,
    error,
    getLines,
    createFirstLines,
    setSpeakChara,
    setSpeakLines,
    editLines,
    setBackground
  }
}

export default useLines
