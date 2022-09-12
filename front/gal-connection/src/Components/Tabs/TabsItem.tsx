import React from 'react'
import { ITab } from '.'
import style from './style.module.scss'

interface ITabsItemProps {
  data: ITab
  onClick: () => void
}

function TabsItem (props: ITabsItemProps) {
  return (
    <div onClick={props.onClick} className={style.tab}>
      {props.data.text}
    </div>
  )
}

export default TabsItem
