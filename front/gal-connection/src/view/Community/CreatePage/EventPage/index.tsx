import React from 'react'
import { useParams } from 'react-router-dom'
import GameEventTree from '../../../../Components/GameEventTree'
import useEvent from '../../../../Hooks/useEvent'
import EventSetting from './EventSetting'
import style from './style.module.scss'

function EventPage () {
  const { gameId } = useParams()
  const { evnets, edges, addEdge, addEvent, editEventPosition } = useEvent(
    parseInt(gameId || '0')
  )

  return (
    <div className={style.main}>
      <div className={style.tree}>
        <GameEventTree
          eventList={evnets}
          edgeList={edges}
          onNoteMoved={editEventPosition}
          onAddNote={(data) => {
            addEvent({
              gameId: parseInt(gameId || '0'),
              eventName: '未命名事件',
              ...data
            })
          }}
          onConnect={(data) => {
            addEdge({
              source: parseInt(data.source),
              target: parseInt(data.target),
              gameId: parseInt(gameId || '0')
            })
          }}
        />
      </div>
      <div className={style.setting}>
        <EventSetting />
      </div>
    </div>
  )
}

export default EventPage
