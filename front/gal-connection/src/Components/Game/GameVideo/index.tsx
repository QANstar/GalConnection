import React, { useEffect, useRef } from 'react'
import style from './style.module.scss'
import JoLPlayer, { JoLPlayerRef } from 'jol-player'

interface IGameVideoProps {
  url: string
  width: number
  height: number
  onVideoEnd?: () => void
}
function GameVideo (props: IGameVideoProps) {
  const { url, width, height, onVideoEnd } = props
  const videoRef = useRef<JoLPlayerRef>(null)
  useEffect(() => {
    if (url !== '') {
      setTimeout(() => {
        if (videoRef.current) videoRef.current.play()
      }, 1000)
    }
  }, [url, videoRef.current])
  return (
    <div className={style.player}>
      <JoLPlayer
        ref={videoRef}
        option={{
          videoSrc: url,
          width,
          height
        }}
        onEndEd={onVideoEnd}
      />
    </div>
  )
}

export default GameVideo
