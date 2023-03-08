import React, { useEffect } from 'react'
import AudioPlayer from 'react-h5-audio-player'
import style from './style.module.scss'

interface IGameAudioProps {
  url: string
  isDevMode?: boolean
  loop?: boolean
}
function GameAudio (props: IGameAudioProps) {
  useEffect(() => {}, [])
  return (
    <div className={style.player}>
      <AudioPlayer
        autoPlayAfterSrcChange={!props.isDevMode}
        loop={props.loop}
        autoPlay={!props.isDevMode}
        src={props.url}
      />
    </div>
  )
}

export default GameAudio
