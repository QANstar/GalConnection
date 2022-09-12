import React from 'react'
import { ITab } from '.'
import style from './style.module.scss'

interface ITabsItemProps {
  data: ITab
  onClick: () => void
  isActive: boolean
}

function TabsItem (props: ITabsItemProps) {
  return (
    <div
      onClick={props.onClick}
      className={props.isActive ? style.tab_active : style.tab}
    >
      {props.data.text}
    </div>
  )
}

export default TabsItem
