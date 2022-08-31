import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './style.module.scss'
import TopNav from '../../../Components/TopNav'

function MainLayout () {
  return (
    <div>
      <header className={style.header}>
        <TopNav />
      </header>
      <main className={style.main}>
        <Outlet />
      </main>
    </div>
  )
}

export default MainLayout
