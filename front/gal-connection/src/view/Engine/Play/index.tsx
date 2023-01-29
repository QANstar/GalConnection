import React, { useEffect } from 'react'
import Game from '../../../Components/Game'
import style from './style.module.scss'

function Play () {
  useEffect(() => {}, [])

  return (
    <div className={style.gameView}>
      <Game />
    </div>
  )
}

export default Play
