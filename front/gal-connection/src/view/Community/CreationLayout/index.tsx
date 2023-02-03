import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Tabs, { ITab } from '../../../Components/Tabs'
import style from './style.module.scss'

function CreationLayout () {
  const navigate = useNavigate()
  const location = useLocation()
  const tabs: ITab[] = [
    {
      link: '/creation',
      text: '作品',
      key: 'mygame'
    },
    {
      link: '/creation/statistics',
      text: '统计',
      key: 'myMaterial'
    }
  ]

  return (
    <div className={style.mygame_main}>
      <Tabs
        items={tabs}
        active={location.pathname}
        onItemClick={(link) => {
          navigate(link)
          console.log(link)
        }}
      />
      <Outlet />
    </div>
  )
}

export default CreationLayout
