import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import LeftNav, { INav } from '../../../Components/LeftNav'
import style from './style.module.scss'
import useGameInfo from '../../../Hooks/useGameInfo'
import SaveAndLoad from '../../../Components/Game/SaveAndLoad'
import useGame from '../../../Hooks/useGame'

function PlayHomeLayout () {
  const { gameId } = useParams()
  const navigate = useNavigate()
  const { saves, delSave } = useGame(parseInt(gameId || '0'))
  const { gameInfo } = useGameInfo(parseInt(gameId || '0'))
  const [saveAndLoadOpen, setSaveAndLoadOpen] = useState(false)
  const navItems: INav[] = [
    {
      text: '继续',
      subtext: 'Continue',
      key: 'Continue'
    },
    {
      onClick: () => {
        navigate(`/engine/${gameId}/play`)
      },
      text: '开始游戏',
      subtext: 'Start',
      key: 'Start'
    },
    {
      onClick: () => {
        setSaveAndLoadOpen(true)
      },
      text: '读取存档',
      subtext: 'Load',
      key: 'Load'
    },
    {
      text: '系统设置',
      subtext: 'Config',
      key: 'Config'
    },
    {
      text: '鉴赏',
      subtext: 'Extra',
      key: 'Extra'
    }
  ]

  return (
    <div
      style={{ backgroundImage: `url(${gameInfo?.homeBg})` }}
      className={style.home_content}
    >
      <header className={style.left_nav}>
        <LeftNav items={navItems} />
      </header>
      <SaveAndLoad
        onDel={delSave}
        saveList={saves}
        onClose={() => {
          setSaveAndLoadOpen(false)
        }}
        onLoad={(val) => {
          navigate(`/engine/${gameId}/play`, {
            state: val
          })
        }}
        isSave={false}
        open={saveAndLoadOpen}
        isHome
      />
    </div>
  )
}

export default PlayHomeLayout
