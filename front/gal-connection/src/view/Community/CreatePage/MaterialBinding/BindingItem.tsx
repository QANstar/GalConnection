import style from './style.module.scss'
import React from 'react'
import { IBinding } from '../../../../types/type'

interface IBindingItemProps {
  data: IBinding
  onClick: () => void
}

function BindingItem (props: IBindingItemProps) {
  return (
    <div onClick={props.onClick} className={style.item}>
      <img className={style.cover} src={props.data.cover} alt="封面" />
      <div className={style.itemText}>{props.data.name}</div>
    </div>
  )
}

export default BindingItem
