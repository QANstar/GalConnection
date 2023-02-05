import React from 'react'
import { useParams } from 'react-router-dom'
import GameEventTree from '../../../../Components/GameEventTree'
import useEvent from '../../../../Hooks/useEvent'
import style from './style.module.scss'

// interface IEventPageProps {}

function EventPage () {
  const { gameId } = useParams()
  const { evnets, addEvent, editEventPosition } = useEvent(
    parseInt(gameId || '0')
  )

  return (
    <div className={style.main}>
      <div className={style.tree}>
        <GameEventTree
          eventList={evnets}
          onNoteMoved={editEventPosition}
          onAddNote={(data) => {
            addEvent({
              gameId: parseInt(gameId || '0'),
              eventName: '未命名事件',
              ...data
            })
          }}
        />
      </div>
    </div>
  )
}

export default EventPage
