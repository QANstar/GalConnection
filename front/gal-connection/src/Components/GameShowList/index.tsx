import React from 'react'
import { IGame } from '../../types/type'
import GameShowItem from './item'
import style from './style.module.scss'

interface IGameShowListProps {
  games: IGame[]
}

function GameShowList (props: IGameShowListProps) {
  return (
    <div className={style.list}>
      {props.games.map((item) => (
        <GameShowItem key={item.id} game={item} />
      ))}
    </div>
  )
}

export default GameShowList
