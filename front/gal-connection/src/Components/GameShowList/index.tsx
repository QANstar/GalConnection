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
  isRecycleBin?: boolean
  onDelClick?: (gameId: number) => void
  onRestoreClick?: (gameId: number) => void
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
              onDelClick={props.onDelClick}
              onRestoreClick={props.onRestoreClick}
              isRecycleBin={props.isRecycleBin}
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
