import { AlignLeftOutlined } from '@ant-design/icons'
import { Avatar, Drawer, Dropdown, Menu } from 'antd'
import { Observer } from 'mobx-react'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../Hooks/useUser'
import style from './style.module.scss'

function TopNav () {
  const { user, logout } = useUser()
  const [drawervisible, setDrawerVisible] = useState(false)

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
  }
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
                key: 'creation',
                label: <Link to={'/creation'}>我的作品</Link>
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
          <div className={style.left}>
            <AlignLeftOutlined
              onClick={showDrawer}
              className={style.menu_btn}
            />
            <Link to="/" className={style.title}>
              GalConnection
            </Link>
          </div>
          <div className={style.right}>
            <Dropdown overlay={menu}>
              <Avatar className={style.avatar} src={user.avatar} size={40} />
            </Dropdown>
          </div>
          <Drawer
            width="300px"
            title={<div className={style.title}>GalConnection</div>}
            placement="left"
            onClose={onClose}
            visible={drawervisible}
          ></Drawer>
        </header>
      )}
    </Observer>
  )
}

export default TopNav
