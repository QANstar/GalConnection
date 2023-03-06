import React from 'react'
import GameShowList from '../../../Components/GameShowList'
import useHomeGames from '../../../Hooks/useHomeGames'
import style from './style.module.scss'

function Home () {
  const { gameRecommenderList } = useHomeGames()
  return (
    <div className={style.home}>
      {gameRecommenderList && (
        <GameShowList
          onItemClick={(gameData) => {
            window.open(`/engine/${gameData.id}/info`)
          }}
          games={gameRecommenderList}
        />
      )}
    </div>
  )
}

export default Home
