import React from 'react'
import Tabs, { ITab } from '../../../Components/Tabs'
import style from './style.module.scss'

function MyGame () {
  const tabs: ITab[] = [
    {
      link: '/mygame',
      text: '我的创作',
      key: 'mygame'
    }
  ]
  return (
    <div className={style.mygame_main}>
      <Tabs
        items={tabs}
        active={tabs[0].link}
        setActive={(link) => {
          console.log(link)
        }}
      ></Tabs>
    </div>
  )
}

export default MyGame
