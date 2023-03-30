import React from 'react'
import { IGame } from '../../types/type'
import GameShowItem from './item'
import style from './style.module.scss'

interface IGameShowListProps {
  games: IGame[]
  onItemClick: (game: IGame) => void
  showIndex?: boolean
}

function GameShowList (props: IGameShowListProps) {
  return (
    <div className={style.list}>
      {props.games.map((item, index) => (
        <GameShowItem
          index={index}
          showIndex={props.showIndex}
          onClick={() => props.onItemClick(item)}
          key={item.id}
          game={item}
        />
      ))}
    </div>
  )
}

export default GameShowList
