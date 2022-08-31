import React from 'react'
import { Outlet } from 'react-router-dom'
import LeftNav, { INav } from '../../../Components/LeftNav'
import style from './style.module.scss'
import game from '../../../test/game.json'

function PlayHomeLayout () {
  const navItems: INav[] = [
    {
      link: '/engine',
      text: '继续',
      subtext: 'Continue',
      key: 'Continue'
    },
    {
      link: '/engine/play',
      text: '开始游戏',
      subtext: 'Start',
      key: 'Start'
    },
    {
      link: '/engine/load',
      text: '读取存档',
      subtext: 'Load',
      key: 'Load'
    },
    {
      link: '/engine',
      text: '系统设置',
      subtext: 'Config',
      key: 'Config'
    },
    {
      link: '/engine',
      text: '鉴赏',
      subtext: 'Extra',
      key: 'Extra'
    }
  ]

  return (
    <div
      style={{ backgroundImage: `url(${game.homeBg})` }}
      className={style.home_content}
    >
      <header className={style.left_nav}>
        <LeftNav items={navItems} />
      </header>
      <main className={style.home_layout_main}>
        <Outlet />
      </main>
    </div>
  )
}

export default PlayHomeLayout
