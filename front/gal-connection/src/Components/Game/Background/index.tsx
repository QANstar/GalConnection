import React, { useEffect, useRef } from 'react'
import style from './style.module.scss'

interface IBackground {
  img: string
  style: string
}
function Background (props: IBackground) {
  const backgroundStyle = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (backgroundStyle.current) {
      backgroundStyle.current.setAttribute('style', props.style)
    }
  }, [props.style])
  return (
    <img
      className={style.background}
      ref={backgroundStyle}
      src={props.img}
      alt="背景"
    />
  )
}

export default Background
