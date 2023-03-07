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
  onItemClick: (link: string) => void
  actions?: { element: React.ReactNode }[]
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
    <div className={style.main}>
      <div className={style.tabs}>
        {props.items.map((item) => (
          <TabsItem
            isActive={props.active === item.link}
            key={item.key}
            data={item}
            onClick={() => {
              props.onItemClick(item.link)
            }}
          />
        ))}

        <span
          style={{ transform: `translateX(${getIndex * 100}%)` }}
          className={style.glider}
        ></span>
      </div>
      <div className={style.actions}>
        {props.actions &&
          props.actions.map((action, index) => (
            <div key={index}>{action.element}</div>
          ))}
      </div>
    </div>
  )
}

export default Tabs
