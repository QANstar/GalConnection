import { Button } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GameShowList from '../../../Components/GameShowList'
import useGetGameList from '../../../Hooks/useGetGameList'
import style from './style.module.scss'

function MyCreation () {
  const { gameList } = useGetGameList('selfCreate')
  const navigate = useNavigate()

  return (
    <div className={style.main}>
      {gameList.length > 0
        ? (
        <GameShowList
          onItemClick={(game) => {
            navigate(`/createPage/${game.id}`)
          }}
          games={gameList}
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
