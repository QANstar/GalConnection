import { Button } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GamePaginationList from '../../../Components/GamePaginationList'
import useGetGameList from '../../../Hooks/useGetGameList'
import style from './style.module.scss'

function MyCreation () {
  const { gameList, page, total, limit, setPage } = useGetGameList('selfCreate')
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
            navigate(`/createPage/${gameData.id}`)
          }}
        />
          )
        : (
        <div className={style.startCreate}>
          <div className={style.startCreateText}>来制作并发布你的作品吧</div>
          <Link to="/startCreate">
            <Button type="primary" shape="round" size="large">
              开始创作
            </Button>
          </Link>
        </div>
          )}
    </div>
  )
}

export default MyCreation
