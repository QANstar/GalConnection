import React, { useMemo } from 'react'
import { IGame } from '../../types/type'
import GameShowItem from './item'
import style from './style.module.scss'
import LoadingItem from './LoadingItem'

interface IGameShowListProps {
  games: IGame[]
  onItemClick: (game: IGame) => void
  showIndex?: boolean
  loading?: boolean
}

function GameShowList (props: IGameShowListProps) {
  const loadingList = useMemo(() => {
    const loadingItems: React.ReactNode[] = []
    for (let i = 0; i < 9; i++) {
      loadingItems.push(<LoadingItem key={i} />)
    }
    return loadingItems
  }, [])

  return (
    <div className={style.list}>
      {props.loading
        ? (
        <>{loadingList.map((item) => item)}</>
          )
        : (
        <>
          {props.games.map((item, index) => (
            <GameShowItem
              index={index}
              showIndex={props.showIndex}
              onClick={() => props.onItemClick(item)}
              key={item.id}
              game={item}
            />
          ))}
        </>
          )}
    </div>
  )
}

export default GameShowList
