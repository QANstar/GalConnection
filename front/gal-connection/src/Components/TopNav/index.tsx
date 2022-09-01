import { Avatar, Dropdown, Menu } from 'antd'
import { Observer } from 'mobx-react'
import React from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../Hooks/useUser'
import style from './style.module.scss'

function TopNav () {
  const { user, logout } = useUser()
  const menu = (
    <Menu
      items={
        user.token !== ''
          ? [
              {
                key: 'userCenter',
                label: <Link to={`/userCenter/${user.nickname}`}>用户中心</Link>
              },
              {
                key: 'logout',
                label: <div onClick={logout}>退出</div>
              }
            ]
          : [
              {
                key: 'login',
                label: <Link to="/login">登录</Link>
              },
              {
                key: 'signin',
                label: <Link to="/signup">注册</Link>
              }
            ]
      }
    />
  )
  return (
    <Observer>
      {() => (
        <header className={style.topNav}>
          <div></div>
          <div className={style.right}>
            <Dropdown overlay={menu}>
              <Avatar className={style.avatar} src={user.avatar} size={40} />
            </Dropdown>
          </div>
        </header>
      )}
    </Observer>
  )
}

export default TopNav
