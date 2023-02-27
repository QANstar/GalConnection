import lines from '../test/lines.json'
import events from '../test/events.json'
import optionsData from '../test/options.json'
import { useMemo, useState } from 'react'
import { EndType, IEvents, IOptions } from '../types/gameTypes'

const useGameOld = () => {
  const [choOptions, setChoOptions] = useState<string[]>([])
  const [event, setEvent] = useState<IEvents>(events[0])
  const [linesIndex, setLineIndex] = useState(0)
  const [options, setOptions] = useState<IOptions[]>([])
  const [linesData, setLinesData] = useState(
    lines.filter((line) => line.eventId === events[0].id)
  )

  // 下一个台词
  const nextLines = () => {
    if (linesIndex < linesData.length - 1) {
      setLineIndex(linesIndex + 1)
    } else {
      const nextEvents = events.filter((x) => x.pid === event.id)
      if (event.endType === EndType.NEXT && nextEvents.length > 0) {
        setEvent(nextEvents[0])
        const nextEventLines = lines.filter(
          (x) => x.eventId === nextEvents[0].id
        )
        setLinesData(nextEventLines)
        setLineIndex(0)
      } else if (event.endType === EndType.OPTION) {
        setOptions(optionsData.filter((x) => x.eventId === event.id))
      }
    }
  }

  // 当前台词
  const currentLines = useMemo(() => {
    return linesData[linesIndex]
  }, [linesIndex, linesData])

  // 选择选项
  const choOption = (choId: string) => {
    if (!choOptions.includes(choId)) choOptions.push(choId)
    setChoOptions([...choOptions])
    const nextEvents = events.filter((x) => x.pid === event.id)
    // 找出下一个符合条件的事件
    for (const item of nextEvents) {
      if (item.enterCondition.every((item) => choOptions.includes(item))) {
        setEvent(item)
        const nextEventLines = lines.filter((x) => x.eventId === item.id)
        setLinesData(nextEventLines)
        setLineIndex(0)
        break
      }
    }
    setOptions([])
  }

  return { event, currentLines, nextLines, choOption, options }
}

export default useGameOld
