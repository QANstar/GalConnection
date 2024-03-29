import { toJpeg } from 'html-to-image'
import React, { useEffect, useRef, useState } from 'react'
import { IBackLog, IGameState, ILines, IOptions, ISave } from '../../types/type'
import Background from './Background'
import BackLog from './BackLog'
import CharaPicList from './CharaPicList'
import GameAudio from './GameAudio'
import OptionList from './OptionList'
// import OptionList from './OptionList'
import PlayLines from './PlayLines'
import SaveAndLoad from './SaveAndLoad'
import style from './style.module.scss'
import GameVideo from './GameVideo'

interface IGameProps {
  lines: ILines
  isDevMode?: boolean
  nextLinesClick?: () => void
  options?: IOptions[]
  video?: string
  isVideoVisable?: boolean
  isOptionVisable?: boolean
  choOption?: (data: number) => void
  saveList?: ISave[]
  backLogData?: IBackLog[]
  onSave?: (index: number, imgDataUrl: string) => void
  onLoad?: (data: ISave) => void
  onDelSave?: (saveId: number) => void
  autoClick?: () => void
  skipClick?: () => void
  jumpClick?: (gameState: IGameState) => void
  onVideoEnd?: () => void
  currentLinesText?: string
}

function Game (props: IGameProps) {
  const gameRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState(0)
  const [width, setWidth] = useState(0)
  const [saveAndLoadOpen, setSaveAndLoadOpen] = useState(false)
  const [backLogOpen, setBackLogOpen] = useState(false)
  const [isSave, setIsSave] = useState(false)

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

  const saveGame = async (index: number) => {
    if (gameRef.current === null || !props.onSave) {
      return
    }
    let dataUrl = ''
    try {
      dataUrl = await toJpeg(gameRef.current, { quality: 0.95 })
    } catch (error) {
      console.log(error)
    }
    props.onSave(index, dataUrl)
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
    <>
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
        {props.video && props.isVideoVisable && (
          <GameVideo
            onVideoEnd={props.onVideoEnd}
            width={width}
            height={height}
            url={props.video}
          />
        )}
        {props.options && props.isOptionVisable && (
          <OptionList
            choOption={(choId) => {
              if (props.choOption) props.choOption(choId)
            }}
            data={props.options}
            visable={props.isOptionVisable}
          />
        )}
        <CharaPicList
          isDevMode={props.isDevMode}
          charaPics={props.lines.LinesChara}
        />
        <PlayLines
          currentLinesText={props.currentLinesText}
          autoClick={() => {
            if (props.autoClick) {
              props.autoClick()
            }
          }}
          skipClick={() => {
            if (props.skipClick) {
              props.skipClick()
            }
          }}
          isDevMode={props.isDevMode}
          openSave={() => {
            setIsSave(true)
            setSaveAndLoadOpen(true)
          }}
          openLoad={() => {
            setIsSave(false)
            setSaveAndLoadOpen(true)
          }}
          backLogClick={() => {
            setBackLogOpen(true)
          }}
          data={props.lines.LinesContent[0]}
        />
        <Background
          isDevMode={props.isDevMode}
          img={props.lines.LinesBackground.background}
          style={props.lines.LinesBackground.style}
        />
      </div>
      <GameAudio
        isDevMode={props.isDevMode}
        loop
        url={props.lines.LinesBgm.bgm}
      />
      <GameAudio
        isDevMode={props.isDevMode}
        loop={false}
        url={props.lines.LinesVoice[0].voice || ''}
      />
      {props.saveList && (
        <SaveAndLoad
          onDel={props.onDelSave}
          saveList={props.saveList}
          onClose={() => {
            setSaveAndLoadOpen(false)
          }}
          setIsSave={(val) => {
            setIsSave(val)
          }}
          onSave={(index) => saveGame(index)}
          onLoad={(val) => {
            if (props.onLoad) props.onLoad(val)
            setSaveAndLoadOpen(false)
          }}
          isSave={isSave}
          open={saveAndLoadOpen}
        />
      )}
      {props.backLogData && (
        <BackLog
          onJumpClick={(val) => {
            if (props.jumpClick) {
              props.jumpClick(val)
            }
          }}
          backLogData={props.backLogData}
          open={backLogOpen}
          onClose={() => {
            setBackLogOpen(false)
          }}
        />
      )}
    </>
  )
}

export default Game
