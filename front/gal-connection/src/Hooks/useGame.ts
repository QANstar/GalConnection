import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  IBackLog,
  IEdge,
  IEvent,
  IGameState,
  ILines,
  ILocalCurrentSave,
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

const autoDuring = 1000
const skipDuring = 100

const useGame = (gameId: number, state?: IGameState) => {
  const { user } = useUser()
  const [events, setEvents] = useState<IEvent[]>([])
  const [edges, setEdges] = useState<IEdge[]>([])
  const [lines, setLines] = useState<ILines[]>([])
  const [saves, setSaves] = useState<ISave[]>([])
  const [linesNow, setLinesNow] = useState<ILines>()
  const [evnetNow, setEventNow] = useState<IEvent>()
  const [currentLinesText, setCurrentLinesText] = useState<string>('')
  const [backLog, setBackLog] = useState<IBackLog[]>([])
  const [options, setOptions] = useState<IOptions[]>([])
  const [currentVideo, setCurrentVideo] = useState<string>('')
  const [choOptions, setChoOptions] = useState<string[]>([])
  const [optionsNow, setOptionsNow] = useState<IOptions[]>([])
  const [optionsVisable, setOptionsVisable] = useState<boolean>(false)
  const [videoVisable, setVideoVisable] = useState<boolean>(false)

  const [isAuto, setIsAuto] = useState(false)
  const [isSkip, setIsSkip] = useState(false)
  const timer = useRef<any>(null)
  const nextLinesRef = useRef<any>()

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

  // 删除存档
  const delSave = useCallback(
    async (saveId: number) => {
      try {
        setError('')
        const { status } = await gameService.delSave(saveId)
        if (status === 200) {
          setSaves(saves.filter((x) => x.id !== saveId))
          message.success('删除成功')
        }
      } catch (e: any) {
        setError(e)
      }
    },
    [saves]
  )

  // 读档
  const loadGame = useCallback(
    (saveData: IGameState) => {
      setBackLog([])
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
        checkEndType(evnetNow)
      } else {
        const nextLines = lines.find((x) => x.id === linesNow.next)
        setLinesNow(nextLines)
      }
    } else {
      checkEndType(evnetNow)
    }
  }, [gameId, events, lines, edges, linesNow, evnetNow])

  // 检查结束类型
  const checkEndType = (currentEvent?: IEvent) => {
    if (currentEvent) {
      if (currentEvent.endType === EventEndType.NEXT) {
        changeEvent()
      } else if (currentEvent.endType === EventEndType.OPTION) {
        setIsAuto(false)
        setIsSkip(false)
        setOptionsVisable(true)
        setOptionsNow(options.filter((x) => x.eventId === currentEvent.id))
      } else if (currentEvent.endType === EventEndType.VIDEO) {
        if (currentEvent.video) {
          setCurrentVideo(currentEvent.video)
        }
        setVideoVisable(true)
        setIsAuto(false)
        setIsSkip(false)
      } else {
        setIsAuto(false)
        setIsSkip(false)
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

    if (!nextLines) {
      checkEndType(nextEvent)
    } else {
      setLinesNow(nextLines)
    }
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

  // 视频播放结束
  const onVideoEnd = () => {
    setCurrentVideo('')
    setVideoVisable(false)
    setTimeout(() => {
      changeEvent()
    }, 100)
  }

  // 继续游戏
  const continueGameData = useMemo(() => {
    const localName = 'localCurrentSaveData'
    let currentSaveStr = window.localStorage.getItem(localName)
    if (!currentSaveStr) {
      window.localStorage.setItem(localName, '[]')
      currentSaveStr = '[]'
    }
    const currentSaveList: ILocalCurrentSave[] = JSON.parse(currentSaveStr)
    const thisCurrentSave = currentSaveList.find((x) => x.gameId === gameId)
    if (!thisCurrentSave) {
      return null
    }
    return thisCurrentSave
  }, [gameId])

  useEffect(() => {
    getGamePlayData()
  }, [gameId])

  // 自动模式
  const autoMode = useCallback(
    (auto?: boolean) => {
      if (auto !== undefined) {
        setIsAuto(auto)
      } else {
        setIsAuto(!isAuto)
      }
    },
    [isAuto]
  )

  // 记录本地进度
  const localCurrentSave = useCallback(
    (linesNowId: number, choOptionsData: string) => {
      const localName = 'localCurrentSaveData'
      let currentSaveStr = window.localStorage.getItem(localName)
      if (!currentSaveStr) {
        window.localStorage.setItem(localName, '[]')
        currentSaveStr = '[]'
      }
      const currentSaveList: ILocalCurrentSave[] = JSON.parse(currentSaveStr)
      const thisCurrentSave = currentSaveList.find((x) => x.gameId === gameId)
      if (!thisCurrentSave) {
        currentSaveList.push({
          gameId,
          state: {
            linesId: linesNowId,
            choOptions: choOptionsData
          }
        })
      } else {
        thisCurrentSave.state = {
          linesId: linesNowId,
          choOptions: choOptionsData
        }
      }
      window.localStorage.setItem(localName, JSON.stringify(currentSaveList))
    },
    [gameId]
  )

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    if (isAuto) {
      timer.current = setInterval(() => nextLinesRef.current(), autoDuring)
    }
    return () => clearInterval(timer.current)
  }, [isAuto])

  // 快进模式
  const skipMode = useCallback(
    (skip?: boolean) => {
      if (skip !== undefined) {
        setIsSkip(skip)
      } else {
        setIsSkip(!isSkip)
      }
    },
    [isSkip]
  )

  useEffect(() => {
    if (timer.current) {
      clearInterval(timer.current)
    }
    if (isSkip) {
      timer.current = setInterval(() => nextLinesRef.current(), skipDuring)
    }
    return () => clearInterval(timer.current)
  }, [isSkip])

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

  useEffect(() => {
    if (linesNow) {
      backLog.push({
        gameState: {
          linesId: linesNow.id!,
          choOptions: choOptions.join(',')
        },
        lines: linesNow
      })
      setBackLog([...backLog])
    }
  }, [linesNow])

  useEffect(() => {
    nextLinesRef.current = nextLines
  })

  useEffect(() => {
    if (linesNow && linesNow.id) {
      localCurrentSave(linesNow.id, choOptions.join(','))
    }
  }, [linesNow, choOptions])

  useEffect(() => {
    setCurrentLinesText('')
    let currentIndex = 0
    let intervalId: any = null
    if (linesNow && linesNow.LinesContent[0].linesContent1.length > 0) {
      const content = '      ' + linesNow.LinesContent[0].linesContent1
      intervalId = setInterval(() => {
        setCurrentLinesText((prevText) => {
          return prevText + content[currentIndex]
        })
        currentIndex++
        if (currentIndex >= content.length - 1) {
          clearInterval(intervalId)
        }
      }, 10)
    }
    return () => clearInterval(intervalId)
  }, [linesNow])

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
    backLog,
    currentLinesText,
    continueGameData,
    currentVideo,
    videoVisable,
    nextLines,
    selectOptions,
    saveGame,
    loadGame,
    autoMode,
    skipMode,
    delSave,
    onVideoEnd
  }
}

export default useGame
