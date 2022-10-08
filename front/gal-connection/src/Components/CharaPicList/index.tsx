import React, { useEffect, useRef } from 'react'
import style from './style.module.scss'

interface ICharaPicListProps {
  charaPics: {
    pics: string
    style: string
  }[]
}

const CharaPicList = (props: ICharaPicListProps) => {
  const charaImgList = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (charaImgList.current) {
      let index = 0
      for (const charaImg of charaImgList.current.children) {
        charaImg.setAttribute('style', props.charaPics[index].style)
        index++
      }
    }
  }, props.charaPics)

  return (
    <div ref={charaImgList} className={style.cover}>
      {props.charaPics.map((charaPic, index) => (
        <img key={index} src={charaPic.pics} />
      ))}
    </div>
  )
}

export default CharaPicList
