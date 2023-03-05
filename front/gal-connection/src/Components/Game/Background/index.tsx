import React, { useEffect, useRef } from 'react'
import style from './style.module.scss'

interface IBackground {
  img: string
  style: string
  isDevMode?: boolean
}
function Background (props: IBackground) {
  const backgroundStyle = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (backgroundStyle.current) {
      let bgStyle = props.style
      if (props.isDevMode) {
        const devStyle = bgStyle
          .split(';')
          .filter((x) => !x.includes('transition'))
        devStyle.push('transition:none')
        bgStyle = devStyle.join(';')
      }
      backgroundStyle.current.setAttribute('style', bgStyle)
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
