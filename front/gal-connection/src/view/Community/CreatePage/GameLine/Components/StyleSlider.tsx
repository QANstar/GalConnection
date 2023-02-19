import { Slider } from 'antd'
import React, { useMemo } from 'react'

import style from '../style.module.scss'

interface IStyleSliderProps {
  style: string
  onChange: (data: { top: number; left: number; width: number }) => void
}

function StyleSlider (props: IStyleSliderProps) {
  const styleValues = useMemo(() => {
    let top = 0
    let left = 0
    let width = 100
    const styleList = props.style.split(';')
    for (const item of styleList) {
      const styleValue = item.replaceAll(' ', '').split(':')
      if (styleValue[0] === 'top') {
        top = parseInt(styleValue[1])
      } else if (styleValue[0] === 'left') {
        left = parseInt(styleValue[1])
      } else if (styleValue[0] === 'width') {
        width = parseInt(styleValue[1])
      }
    }
    return {
      top,
      left,
      width
    }
  }, [props.style])

  return (
    <div className={style.styleSlider}>
      <div>横向位移</div>
      <Slider
        onChange={(value) => {
          const data = styleValues
          data.left = value
          props.onChange(data)
        }}
        value={styleValues.left}
        max={200}
        min={-200}
      />
      <div>纵向位移</div>
      <Slider
        onChange={(value) => {
          const data = styleValues
          data.top = value
          props.onChange(data)
        }}
        value={styleValues.top}
        max={200}
        min={-200}
      />
      <div>大小</div>
      <Slider
        onChange={(value) => {
          const data = styleValues
          data.width = value
          props.onChange(data)
        }}
        value={styleValues.width}
        max={300}
        min={0}
      />
    </div>
  )
}

export default StyleSlider
