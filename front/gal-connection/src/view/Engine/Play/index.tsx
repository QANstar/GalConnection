import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useGame from '../../../Hooks/useGame'
import Game from '../../../Components/Game'
import style from './style.module.scss'

function Play () {
  const { gameId } = useParams()
  const {
    linesNow,
    optionsNow,
    optionsVisable,
    saves,
    selectOptions,
    nextLines
  } = useGame(parseInt(gameId || '0'))
  useEffect(() => {}, [])

  return (
    <div className={style.gameView}>
      {linesNow && (
        <Game
          saveList={saves}
          options={optionsNow}
          isOptionVisable={optionsVisable}
          choOption={selectOptions}
          lines={linesNow}
          nextLinesClick={nextLines}
        />
      )}
    </div>
  )
}

export default Play
