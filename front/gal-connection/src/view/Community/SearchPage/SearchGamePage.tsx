import { Empty } from 'antd'
import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GamePaginationList from '../../../Components/GamePaginationList'
import useGetGameList from '../../../Hooks/useGetGameList'
import style from './style.module.scss'

function SearchGamePage () {
  const { content } = useParams()
  const { gameList, page, total, limit, setPage } = useGetGameList('search', {
    searchContent: content
  })
  const navigate = useNavigate()

  return (
    <div className={style.main}>
      {gameList.length > 0
        ? (
        <GamePaginationList
          games={gameList}
          current={page}
          total={total}
          limit={limit}
          onPageChange={setPage}
          onItemClick={(gameData) => {
            navigate(`/engine/${gameData.id}/info`)
          }}
        />
          )
        : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
    </div>
  )
}

export default SearchGamePage
