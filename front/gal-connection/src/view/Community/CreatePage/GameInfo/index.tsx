import style from './style.module.scss'
import React from 'react'
import useGameInfo from '../../../../Hooks/useGameInfo'
import CreateAndEditGameForm from '../../../../Components/CreateAndEditGameForm'
import { useParams } from 'react-router-dom'

function GameInfo () {
  const { gameId } = useParams()
  const { gameInfo, editGame } = useGameInfo(parseInt(gameId || '0'))
  return (
    <div className={style.main}>
      <CreateAndEditGameForm initData={gameInfo} onFinish={editGame} />
    </div>
  )
}

export default GameInfo
