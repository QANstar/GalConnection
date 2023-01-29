import React, { useEffect, useRef, useState } from 'react'
import useGame from '../../Hooks/useGame'
import CharaPicList from './CharaPicList'
import OptionList from './OptionList'
import PlayLines from './PlayLines'
import style from './style.module.scss'

function Game () {
  const { currentLines, nextLines, options, choOption } = useGame()
  const [optionVisable, setOptionVisable] = useState(false)
  const gameRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)

  // 设置游戏大小
  const setGameSize = (parentWidth: number, parentHeight: number) => {
    if (parentWidth / parentHeight > 16 / 9) {
      setHeight(parentHeight)
      setWidth((parentHeight / 9) * 16)
    } else {
      setWidth(parentWidth)
      setHeight((parentWidth / 16) * 9)
    }
  }

  const resizeUpdate = () => {
    if (gameRef.current && gameRef.current.parentElement) {
      setGameSize(
        gameRef.current.parentElement.clientWidth,
        gameRef.current.parentElement.clientHeight
      )
    }
  }

  useEffect(() => {
    // 页面变化时获取浏览器窗口的大小
    window.addEventListener('resize', resizeUpdate)

    return () => {
      // 组件销毁时移除监听事件
      window.removeEventListener('resize', resizeUpdate)
    }
  }, [])

  useEffect(() => {
    if (gameRef.current && gameRef.current.parentElement) {
      setGameSize(
        gameRef.current.parentElement.clientWidth,
        gameRef.current.parentElement.clientHeight
      )
    }
  }, [gameRef.current])

  useEffect(() => {
    if (options.length > 0) {
      setOptionVisable(true)
    }
  }, [options])

  return (
    <div
      ref={gameRef}
      style={{
        backgroundImage: `url(${currentLines.background.background})`,
        height: `${height}px`,
        width: `${width}px`
      }}
      onClick={nextLines}
      className={style.main}
    >
      <OptionList
        choOption={(choId: string) => {
          setOptionVisable(false)
          choOption(choId)
        }}
        data={options}
        visable={optionVisable}
      />
      <CharaPicList charaPics={currentLines.charaPics} />
      <PlayLines openSave={() => {}} data={currentLines} />
    </div>
  )
}

export default Game
