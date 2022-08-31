import { Avatar, Dropdown, Menu } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import style from './style.module.scss'

function TopNav () {
  const menu = (
    <Menu
      items={[
        {
          key: 'login',
          label: <Link to="/login">登录</Link>
        },
        {
          key: 'signin',
          label: <Link to="/signin">注册</Link>
        }
      ]}
    />
  )
  return (
    <header className={style.topNav}>
      <div></div>
      <div className={style.right}>
        <Dropdown overlay={menu}>
          <Avatar
            className={style.avatar}
            src="http://139.224.221.148:1145/user/17/少女前线仲夏夜的精灵 大破.png"
            size={40}
          />
        </Dropdown>
      </div>
    </header>
  )
}

export default TopNav
