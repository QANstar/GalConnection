import style from './style.module.scss'
import React, { useEffect } from 'react'
import Game from '../../../../Components/Game'
import useLines from '../../../../Hooks/useLines'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Empty, Input, message } from 'antd'
import TopTools from './TopTools'
import useEvent from '../../../../Hooks/useEvent'
import TextArea from 'antd/es/input/TextArea'

function GameLine () {
  const navigate = useNavigate()

  const { gameId, eventId, linesId } = useParams()
  const { evnets, choEvent, eventCho } = useEvent(parseInt(gameId || '0'))
  const {
    lines,
    error,
    createFirstLines,
    setSpeakChara,
    setSpeakLines,
    editLines
  } = useLines({
    gameId: parseInt(gameId || '0'),
    eventId: parseInt(eventId || '0'),
    linesId: parseInt(linesId || '0')
  })

  useEffect(() => {
    if (error !== '') {
      message.error(error)
    }
  }, [error])
  useEffect(() => {
    if (eventId === '0') {
      const event = evnets.find((x) => x.isStartEvent)
      if (event) eventCho(event.id.toString())
    } else {
      if (eventId) eventCho(eventId)
    }
  }, [eventId, evnets])

  return (
    <div className={style.main}>
      <TopTools
        events={evnets}
        choEvent={choEvent}
        onItemClick={(eventId) => {
          navigate(`/createPage/${gameId}/lines/${eventId}/0`)
        }}
      />
      {lines
        ? (
        <div className={style.lines_main}>
          <div className={style.left}>
            <div className={style.gameView}>
              <Game isDevMode lines={lines} />
            </div>
            <div className={style.lineSetting}>
              <div className={style.inputTile}>人物</div>
              <Input
                value={lines.LinesContent[0].characters}
                onChange={(val) => {
                  setSpeakChara(val.target.value)
                }}
                style={{ width: '50%' }}
                placeholder="人物"
              />
              <div className={style.inputTile}>台词</div>
              <TextArea
                value={lines.LinesContent[0].linesContent1}
                onChange={(val) => {
                  setSpeakLines(val.target.value)
                }}
                placeholder="台词"
              />
            </div>
          </div>
          <div className={style.right}>
            <Button onClick={editLines} block>
              保存编辑
            </Button>
          </div>
        </div>
          )
        : (
        <div className={style.noLinesPage}>
          {linesId === '0'
            ? (
            <div className={style.createNewLines}>
              <div>当前事件无初始台词，是否创建初始台词</div>
              <Button
                onClick={createFirstLines}
                style={{ marginTop: 20 }}
                size="large"
                type="primary"
                shape="round"
              >
                创建台词
              </Button>
            </div>
              )
            : (
            <Empty
              description="台词不存在"
              image={Empty.PRESENTED_IMAGE_SIMPLE}
            />
              )}
        </div>
          )}
    </div>
  )
}

export default GameLine
