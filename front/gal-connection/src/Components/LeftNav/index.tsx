import React from 'react'
import style from './style.module.scss'

export interface INav {
  onClick?: () => void
  text: string
  subtext: string
  key: string
  disable?: boolean
}

interface LeftNavProps {
  items: INav[]
}

function LeftNav (props: LeftNavProps) {
  return (
    <div className={style.leftNav}>
      <ul>
        {props.items.map((item) => (
          <li
            className={item.disable ? style.navitemDisable : style.navitem}
            onClick={item.onClick}
            key={item.key}
          >
            <div>{item.text}</div>
            <div className={style.subtitle}>{item.subtext}</div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeftNav
