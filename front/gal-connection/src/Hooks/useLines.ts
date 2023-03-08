import { message } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import * as gameService from '../service/game'
import {
  ILines,
  ILinesBackground,
  ILinesBgm,
  ILinesChara,
  ILinesVoice
} from '../types/type'

interface IUseLines {
  gameId: number
  eventId: number
  linesId: number
}

const useLines = (params: IUseLines) => {
  const { gameId, eventId, linesId } = params
  const [lines, setLines] = useState<ILines>()
  const [linesList, setLinesList] = useState<ILines[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取台词
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

  // 获取事件所有的台词
  const getLinesListOfEvent = useCallback(async () => {
    try {
      setError('')
      const { data, status } = await gameService.getLinesListOfEvent({
        gameId,
        eventId
      })
      if (status === 200) {
        setLinesList(data)
      } else {
        setLines(undefined)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId, eventId])

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
        LinesBgm: {
          bgm: '',
          bindingId: 0,
          materialId: 0
        },
        LinesContent: [],
        LinesVoice: [],
        LinesChara: []
      })
      if (status === 200) {
        getLinesListOfEvent()
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
          getLinesListOfEvent()
          message.success('编辑成功')
        }
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId, eventId, linesId, lines])

  // 插入台词
  const insertLines = useCallback(
    async (newLines: ILines) => {
      try {
        setLoading(true)
        setError('')
        const { data, status } = await gameService.insertLines(newLines)
        if (status === 200) {
          getLinesListOfEvent()
          message.success('插入成功')
          return data
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, eventId, linesId]
  )

  // 删除台词
  const delLines = useCallback(
    async (linesId: number) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.delLines({ linesId })
        if (status === 200) {
          message.success('删除成功')
          if (params.linesId === 0) {
            getLines()
          }
          getLinesListOfEvent()
          return true
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, eventId, linesId]
  )

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

  // 修改语音
  const setVoice = useCallback(
    async (voice: ILinesVoice) => {
      if (lines) {
        if (lines.LinesVoice.length > 0) {
          lines.LinesVoice[0] = voice
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

  // 修改BGM
  const setBgm = useCallback(
    async (bgm: ILinesBgm) => {
      if (lines) {
        lines.LinesBgm = bgm
        setLines({ ...lines })
      }
    },
    [gameId, eventId, linesId, lines]
  )

  // 修改角色
  const setChara = useCallback(
    async (chara: ILinesChara[]) => {
      if (lines) {
        lines.LinesChara = chara
        setLines({ ...lines })
      }
    },
    [gameId, eventId, linesId, lines]
  )

  useEffect(() => {
    getLines()
  }, [gameId, eventId, linesId])

  useEffect(() => {
    getLinesListOfEvent()
  }, [gameId, eventId])

  return {
    lines,
    loading,
    error,
    linesList,
    getLines,
    createFirstLines,
    setSpeakChara,
    setSpeakLines,
    editLines,
    setBackground,
    setChara,
    insertLines,
    delLines,
    setBgm,
    setVoice
  }
}

export default useLines
