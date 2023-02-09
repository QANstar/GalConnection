import { message } from 'antd'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import GameEventTree from '../../../../Components/GameEventTree'
import useEvent from '../../../../Hooks/useEvent'
import EventSetting from './EventSetting'
import style from './style.module.scss'

function EventPage () {
  const { gameId } = useParams()
  const {
    evnets,
    edges,
    choEvent,
    error,
    eventCho,
    addEdge,
    addEvent,
    editEventPosition,
    delEvnet,
    editEvent
  } = useEvent(parseInt(gameId || '0'))

  useEffect(() => {
    if (error) {
      message.error(error)
    }
  }, [error])

  return (
    <div className={style.main}>
      <div className={style.tree}>
        <GameEventTree
          eventList={evnets}
          edgeList={edges}
          onNoteMoved={editEventPosition}
          onNoteClick={eventCho}
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
        <EventSetting
          onSaveClick={editEvent}
          onDelClick={delEvnet}
          event={choEvent}
        />
      </div>
    </div>
  )
}

export default EventPage
