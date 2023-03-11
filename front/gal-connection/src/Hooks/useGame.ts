import { useCallback, useEffect, useState } from 'react'
import {
  IEdge,
  IEvent,
  IGameState,
  ILines,
  IOptions,
  ISave,
  OssFileType
} from '../types/type'
import * as gameService from '../service/game'
import { checkArrayIncludeAnother } from '../Utils/ArrayUtils'
import { EventEndType } from '../types/enums'
import { dataURLtoBlob } from '../Utils/ImageUtils'
import { uploadFile } from '../service/oss'
import useUser from './useUser'
import { message } from 'antd'

const useGame = (gameId: number, state?: IGameState) => {
  const { user } = useUser()
  const [events, setEvents] = useState<IEvent[]>([])
  const [edges, setEdges] = useState<IEdge[]>([])
  const [lines, setLines] = useState<ILines[]>([])
  const [saves, setSaves] = useState<ISave[]>([])
  const [linesNow, setLinesNow] = useState<ILines>()
  const [evnetNow, setEventNow] = useState<IEvent>()
  const [options, setOptions] = useState<IOptions[]>([])
  const [choOptions, setChoOptions] = useState<string[]>([])
  const [optionsNow, setOptionsNow] = useState<IOptions[]>([])
  const [optionsVisable, setOptionsVisable] = useState<boolean>(false)
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
        setSaves(data.saves)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId])

  // 存档
  const saveGame = useCallback(
    async (index: number, imgDataUrl: string) => {
      try {
        setError('')
        const imgRes = ''
        if (imgDataUrl !== '') {
          const formData = new FormData()
          // 添加要上传的文件
          formData.append('file', dataURLtoBlob(imgDataUrl), 'avatar')
          setLoading(true)
          const res = await uploadFile({
            body: formData,
            query: OssFileType.Picture
          })
          imgDataUrl = res.data
        }
        const saveData: ISave = {
          img: imgRes,
          eventName: evnetNow?.eventName || '',
          linesContent: linesNow?.LinesContent[0].linesContent1 || '',
          linesId: linesNow?.id || 0,
          choOptions: choOptions.join(','),
          saveIndex: index,
          gameId,
          userId: user.id
        }
        const { data, status } = await gameService.saveGame(saveData)
        if (status === 200) {
          const save = saves.find((item) => item.id === data.id)
          if (save) {
            const index = saves.indexOf(save)
            saves[index] = data
          } else {
            saves.push(data)
          }
          setSaves([...saves])
          message.success('保存成功')
        }
      } catch (e: any) {
        setError(e)
      }
    },
    [gameId, saves, evnetNow, linesNow, user, choOptions]
  )

  // 读档
  const loadGame = useCallback(
    (saveData: IGameState) => {
      console.log(saveData)

      const linesData = lines.find((x) => x.id === saveData.linesId)
      setLinesNow(linesData)
      const eventData = events.find((x) => x.id === linesData?.eventId)
      setEventNow(eventData)
      setChoOptions(saveData.choOptions.split(','))
      message.success('读档成功')
    },
    [lines, events]
  )

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
        checkEndType()
      } else {
        const nextLines = lines.find((x) => x.id === linesNow.next)
        setLinesNow(nextLines)
      }
    } else {
      checkEndType()
    }
  }, [gameId, events, lines, edges, linesNow, evnetNow])

  // 检查结束类型
  const checkEndType = () => {
    if (evnetNow) {
      if (evnetNow.endType === EventEndType.NEXT) {
        changeEvent()
      } else if (evnetNow.endType === EventEndType.OPTION) {
        setOptionsVisable(true)
        setOptionsNow(options.filter((x) => x.eventId === evnetNow.id))
      } else {
        changeEvent()
      }
    }
  }

  // 切换事件
  const changeEvent = () => {
    const nextEventIds = edges.filter((x) => x.source === evnetNow?.id)
    if (nextEventIds.length <= 0) return
    let nextEvent: IEvent | undefined
    for (const item of nextEventIds) {
      const event = events.find((x) => x.id === item.target)
      if (event?.enterCondition === '') {
        nextEvent = event
        break
      } else {
        if (
          checkArrayIncludeAnother(
            choOptions,
            event?.enterCondition.split(',') || []
          )
        ) {
          nextEvent = event
          break
        }
      }
    }
    if (!nextEvent) return
    setEventNow(nextEvent)
    const nextLines = lines.find(
      (item) => item.pre === 0 && item.eventId === nextEvent!.id
    )
    setLinesNow(nextLines)
  }

  // 选择选项
  const selectOptions = (optionsId: number) => {
    choOptions.push(optionsId.toString())
    setChoOptions([...choOptions])
    setOptionsVisable(false)
    setTimeout(() => {
      changeEvent()
    }, 100)
  }

  useEffect(() => {
    getGamePlayData()
  }, [gameId])

  useEffect(() => {
    initLinesNow()
  }, [gameId, events, lines])

  useEffect(() => {
    if (state && state.linesId && lines.length > 0 && events.length > 0) {
      if (!state.choOptions) {
        state.choOptions = ''
      }
      loadGame(state)
    }
  }, [lines, events])

  return {
    loading,
    error,
    linesNow,
    options,
    edges,
    evnetNow,
    optionsNow,
    optionsVisable,
    saves,
    nextLines,
    selectOptions,
    saveGame,
    loadGame
  }
}

export default useGame
