import React, { useEffect, useMemo } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import useGame from '../../../Hooks/useGame'
import Game from '../../../Components/Game'
import style from './style.module.scss'

function Play () {
  const { gameId } = useParams()
  const loaction = useLocation()
  const gameState = useMemo(() => {
    if (loaction.state !== null) {
      const { linesId, choOptions } = loaction.state
      if (linesId === undefined) {
        return undefined
      }
      return {
        linesId: parseInt(linesId),
        choOptions
      }
    }
    return undefined
  }, [loaction])
  const {
    linesNow,
    optionsNow,
    optionsVisable,
    saves,
    selectOptions,
    nextLines,
    saveGame,
    loadGame
  } = useGame(parseInt(gameId || '0'), gameState)
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
