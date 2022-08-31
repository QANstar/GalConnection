import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

export interface INav {
  link: string
  text: string
  subtext: string
  key: string
}

interface LeftNavProps {
  items: INav[]
}

function LeftNav (props: LeftNavProps) {
  return (
    <div className={style.leftNav}>
      <ul>
        {props.items.map((item) => (
          <li key={item.key}>
            <Link to={item.link}>
              <div>{item.text}</div>
              <div className={style.subtitle}>{item.subtext}</div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LeftNav
