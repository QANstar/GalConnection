import React from 'react'
import { IGame } from '../../types/type'
import style from './style.module.scss'

interface IGameShowItemProps {
  game: IGame
  onClick: () => void
}

function GameShowItem (props: IGameShowItemProps) {
  return (
    <div onClick={() => props.onClick()} className={style.main}>
      <img
        className={style.gameCover}
        src={props.game.cover}
        alt={props.game.gameName}
      />
      <div className={style.gameName}>{props.game.gameName}</div>
    </div>
  )
}

export default GameShowItem
