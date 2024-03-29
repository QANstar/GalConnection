import style from './style.module.scss'
import React, { useEffect, useMemo } from 'react'
import Game from '../../../../Components/Game'
import useLines from '../../../../Hooks/useLines'
import { useNavigate, useParams } from 'react-router-dom'
import { Button, Empty, Input, message, Tabs, TabsProps } from 'antd'
import TopTools from './TopTools'
import useEvent from '../../../../Hooks/useEvent'
import TextArea from 'antd/es/input/TextArea'
import BackgroundSetting from './BackgroundSetting'
import useBinding from '../../../../Hooks/useBinding'
import { BindingType } from '../../../../types/enums'
import useGameInfo from '../../../../Hooks/useGameInfo'
import CharacterSetting from './CharacterSetting'
import { ILines } from '../../../../types/type'
import AudioSetting from './AudioSetting'

function GameLine () {
  const navigate = useNavigate()
  const { gameId, eventId, linesId } = useParams()
  const { evnets, choEvent, eventCho } = useEvent(parseInt(gameId || '0'))
  const { bindingInfo } = useBinding(parseInt(gameId || '0'))
  const { gameInfo } = useGameInfo(parseInt(gameId || '0'))
  const {
    lines,
    error,
    linesList,
    createFirstLines,
    setSpeakChara,
    setSpeakLines,
    editLines,
    setBackground,
    setChara,
    insertLines,
    delLines,
    setBgm,
    setVoice
  } = useLines({
    gameId: parseInt(gameId || '0'),
    eventId: parseInt(eventId || '0'),
    linesId: parseInt(linesId || '0')
  })

  const onChange = (key: string) => {
    console.log(key)
  }
  const items = useMemo(() => {
    const tabItems: TabsProps['items'] = [
      {
        key: 'character',
        label: '角色',
        children: lines && (
          <CharacterSetting
            onChange={(value) => {
              setChara(value)
            }}
            chara={lines.LinesChara}
            groupId={gameInfo ? gameInfo.groupId : 0}
            data={bindingInfo.filter((x) => x.type === BindingType.CHARACTER)}
          />
        )
      },
      {
        key: 'background/CG',
        label: '背景/CG',
        children: lines && (
          <BackgroundSetting
            onChange={(value) => {
              setBackground(value)
            }}
            background={lines.LinesBackground}
            groupId={gameInfo ? gameInfo.groupId : 0}
            data={bindingInfo.filter(
              (x) =>
                x.type ===
                (lines.LinesBackground.isCG
                  ? BindingType.CG
                  : BindingType.BACKGROUND)
            )}
          />
        )
      },
      {
        key: 'sound',
        label: 'BGM/配音',
        children: lines && (
          <AudioSetting
            onBgmChange={(value) => {
              setBgm(value)
            }}
            onVoiceChange={(value) => {
              setVoice(value)
            }}
            bgm={lines.LinesBgm}
            voice={lines.LinesVoice[0]}
            groupId={gameInfo ? gameInfo.groupId : 0}
            bgmData={bindingInfo.filter((x) => x.type === BindingType.BGM)}
            voiceData={bindingInfo.filter((x) => x.type === BindingType.VOICE)}
          />
        )
      }
    ]
    return tabItems
  }, [lines, gameInfo, bindingInfo])

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
        onLinesSelectChange={(linesId) => {
          if (lines) {
            navigate(`/createPage/${gameId}/lines/${lines.eventId}/${linesId}`)
          }
        }}
        onLeftInsert={async () => {
          const newLines: ILines | undefined = { ...lines } as
            | ILines
            | undefined
          if (newLines && lines) {
            newLines.next = lines.id
            newLines.LinesContent = []
            newLines.LinesVoice = []
            const result = await insertLines(newLines)
            if (result) {
              navigate(
                `/createPage/${gameId}/lines/${result.eventId}/${result.id}`
              )
            }
          }
        }}
        onRightInsert={async () => {
          const newLines: ILines | undefined = { ...lines } as
            | ILines
            | undefined
          if (newLines && lines) {
            newLines.pre = lines.id
            newLines.LinesContent = []
            newLines.LinesVoice = []
            const result = await insertLines(newLines)
            if (result) {
              navigate(
                `/createPage/${gameId}/lines/${result.eventId}/${result.id}`
              )
            }
          }
        }}
        linesList={linesList}
        onSave={editLines}
        onDelete={async () => {
          const res = await delLines(lines?.id || 0)
          if (res) {
            if (lines?.pre !== 0) {
              navigate(`/createPage/${gameId}/lines/${eventId}/${lines?.pre}`)
            } else if (lines?.next !== 0) {
              navigate(`/createPage/${gameId}/lines/${eventId}/${lines?.next}`)
            } else {
              navigate(`/createPage/${gameId}/lines/${eventId}/0`)
            }
          }
        }}
        events={evnets}
        choEvent={choEvent}
        nowLines={lines}
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
            <Tabs
              centered
              defaultActiveKey="character"
              items={items}
              onChange={onChange}
            />
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
