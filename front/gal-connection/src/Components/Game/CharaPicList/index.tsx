import React, { useEffect, useRef } from 'react'
import { ILinesChara } from '../../../types/type'
import style from './style.module.scss'

interface ICharaPicListProps {
  charaPics: ILinesChara[]
  isDevMode?: boolean
}

const CharaPicList = (props: ICharaPicListProps) => {
  const charaImgList = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (charaImgList.current) {
      let index = 0
      for (const charaImg of charaImgList.current.children) {
        let charaStyle = props.charaPics[index].charaStyle
        if (props.isDevMode) {
          const devStyle = charaStyle
            .split(';')
            .filter((x) => !x.includes('transition'))
          devStyle.push('transition:none')
          charaStyle = devStyle.join(';')
        }
        charaImg.setAttribute('style', charaStyle)
        index++
      }
    }
  }, [props.charaPics])

  return (
    <div ref={charaImgList} className={style.cover}>
      {props.charaPics.map((charaPic, index) => (
        <img key={index} src={charaPic.charaPics} />
      ))}
    </div>
  )
}

export default CharaPicList
