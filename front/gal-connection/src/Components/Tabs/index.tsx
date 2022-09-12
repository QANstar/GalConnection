import React, { useMemo } from 'react'
import style from './style.module.scss'
import TabsItem from './TabsItem'

export interface ITab {
  link: string
  text: string
  key: string
}

interface ITabsProps {
  items: ITab[]
  active: string
  setActive: (link: string) => void
}

function Tabs (props: ITabsProps) {
  const getIndex = useMemo(() => {
    let index = 0
    for (const item of props.items) {
      if (item.link === props.active) {
        break
      }
      index++
    }
    return index
  }, [props.active])

  return (
    <div className={style.tabs}>
      {props.items.map((item) => (
        <TabsItem
          key={item.key}
          data={item}
          onClick={() => props.setActive(item.link)}
        />
      ))}

      <span
        style={{ transform: `translateX(${getIndex * 100}%)` }}
        className={style.glider}
      ></span>
    </div>
  )
}

export default Tabs
