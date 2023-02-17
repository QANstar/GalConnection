import style from './style.module.scss'
import React from 'react'
import { IBinding } from '../../../../types/type'

interface IBindingItemProps {
  data: IBinding
}

function BindingItem (props: IBindingItemProps) {
  return (
    <div className={style.main}>
      <img src={props.data.cover} alt="封面" />
      <div>{props.data.name}</div>
    </div>
  )
}

export default BindingItem
