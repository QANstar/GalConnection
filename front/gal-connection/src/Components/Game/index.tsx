import React, { useEffect, useRef, useState } from 'react'
import { ILines, IOptions } from '../../types/type'
import Background from './Background'
import CharaPicList from './CharaPicList'
import OptionList from './OptionList'
// import OptionList from './OptionList'
import PlayLines from './PlayLines'
import style from './style.module.scss'

interface IGameProps {
  lines: ILines
  isDevMode?: boolean
  nextLinesClick?: () => void
  options?: IOptions[]
  isOptionVisable?: boolean
  choOption?: (data: number) => void
}

function Game (props: IGameProps) {
  // const [optionVisable, setOptionVisable] = useState(false)
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

  return (
    <div
      ref={gameRef}
      style={{
        height: `${height}px`,
        width: `${width}px`
      }}
      onClick={() => {
        if (!props.isDevMode && props.nextLinesClick) {
          props.nextLinesClick()
        }
      }}
      className={style.main}
    >
      {props.options && props.isOptionVisable && (
        <OptionList
          choOption={(choId) => {
            if (props.choOption) props.choOption(choId)
          }}
          data={props.options}
          visable={props.isOptionVisable}
        />
      )}

      <CharaPicList charaPics={props.lines.LinesChara} />
      <PlayLines
        isDevMode={props.isDevMode}
        openSave={() => {}}
        data={props.lines.LinesContent[0]}
      />
      <Background
        img={props.lines.LinesBackground.background}
        style={props.lines.LinesBackground.style}
      />
    </div>
  )
}

export default Game
