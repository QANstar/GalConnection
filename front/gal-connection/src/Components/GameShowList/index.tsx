import React from 'react'
import { IGame } from '../../types/type'
import GameShowItem from './item'
import style from './style.module.scss'

interface IGameShowListProps {
  games: IGame[]
  onItemClick: (game: IGame) => void
}

function GameShowList (props: IGameShowListProps) {
  return (
    <div className={style.list}>
      {props.games.map((item) => (
        <GameShowItem
          onClick={() => props.onItemClick(item)}
          key={item.id}
          game={item}
        />
      ))}
    </div>
  )
}

export default GameShowList
