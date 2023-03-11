import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useGame from '../../../Hooks/useGame'
import Game from '../../../Components/Game'
import style from './style.module.scss'

function Play () {
  const { gameId } = useParams()
  const loaction = useLocation()
  const {
    linesNow,
    optionsNow,
    optionsVisable,
    saves,
    selectOptions,
    nextLines,
    saveGame,
    loadGame
  } = useGame(
    parseInt(gameId || '0'),
    loaction.state !== null &&
      loaction.state.linesId !== undefined &&
      loaction.state.choOptions !== undefined
      ? {
          linesId: parseInt(loaction.state.linesId),
          choOptions: loaction.state.choOptions
        }
      : undefined
  )
  useEffect(() => {}, [])

  return (
    <div className={style.gameView}>
      {linesNow && (
        <Game
          onSave={saveGame}
          onLoad={loadGame}
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
