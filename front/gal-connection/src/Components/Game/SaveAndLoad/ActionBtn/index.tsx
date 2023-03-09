import React from 'react'
import style from './style.module.scss'

interface IActionBtnProps {
  title: string
  subTitle: string
  onClick: () => void
  isActive?: boolean
}

function ActionBtn (props: IActionBtnProps) {
  return (
    <div
      onClick={props.onClick}
      className={props.isActive ? style.activeBtn : style.actionBtn}
    >
      <div className={style.title}>{props.title}</div>
      <div className={style.subTitle}>{props.subTitle}</div>
    </div>
  )
}

export default ActionBtn
