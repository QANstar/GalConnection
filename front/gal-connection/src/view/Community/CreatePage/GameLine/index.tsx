import style from './style.module.scss'
import React from 'react'
import Game from '../../../../Components/Game'

function GameLine () {
  // const { gameId } = useParams()
  return (
    <div className={style.main}>
      <div className={style.left}>
        <div className={style.gameView}>
          <Game />
        </div>
        <div className={style.lineSetting}>menu</div>
      </div>
      <div className={style.right}></div>
    </div>
  )
}

export default GameLine
