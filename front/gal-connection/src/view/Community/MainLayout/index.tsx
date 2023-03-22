import React from 'react'
import { Outlet } from 'react-router-dom'
import style from './style.module.scss'
import TopNav from '../../../Components/TopNav'
import { Observer } from 'mobx-react'

function MainLayout () {
  return (
    <Observer>
      {() => (
        <div>
          <header className={style.header}>
            <TopNav />
          </header>
          <main className={style.main}>
            <Outlet />
          </main>
        </div>
      )}
    </Observer>
  )
}

export default MainLayout
