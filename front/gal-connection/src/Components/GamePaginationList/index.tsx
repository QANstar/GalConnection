import { Pagination } from 'antd'
import React from 'react'
import { IGame } from '../../types/type'
import GameShowList from '../GameShowList'
import style from './style.module.scss'

interface IGameShowListProps {
  games: IGame[]
  onItemClick: (game: IGame) => void
  total: number
  current: number
  limit: number
  onPageChange: (page: number) => void
  loading?: boolean
  isRecycleBin?: boolean
  onDelClick?: (gameId: number) => void
  onRestoreClick?: (gameId: number) => void
}

function GamePaginationList (props: IGameShowListProps) {
  return (
    <div className={style.main}>
      <GameShowList
        onDelClick={props.onDelClick}
        onRestoreClick={props.onRestoreClick}
        isRecycleBin={props.isRecycleBin}
        loading={props.loading}
        games={props.games}
        onItemClick={props.onItemClick}
      />
      <div className={style.page}>
        <Pagination
          onChange={(current) => {
            props.onPageChange(current)
          }}
          pageSize={props.limit}
          defaultCurrent={props.current}
          total={props.total}
        />
      </div>
    </div>
  )
}

export default GamePaginationList
