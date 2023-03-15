import { MailOutlined, MenuOutlined, MessageOutlined } from '@ant-design/icons'
import { Avatar, Drawer, Dropdown, Menu } from 'antd'
import { Observer } from 'mobx-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useUser from '../../Hooks/useUser'
import SearchInput from '../SearchInput'
import style from './style.module.scss'

function TopNav () {
  const navigate = useNavigate()
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
                label: <Link to={`/userCenter/${user.id}`}>用户中心</Link>
              },
              {
                key: 'star',
                label: <Link to={`/moreUserStar/${user.id}`}>我的收藏</Link>
              },
              {
                key: 'material',
                label: (
                  <Link to={`/myMaterial/${user.groupId}/0`}>素材中心</Link>
                )
              },
              {
                key: 'creation',
                label: <Link to={'/creation'}>创作中心</Link>
              },
              {
                key: 'logout',
                label: <div onClick={logout}>登出</div>
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
            <MenuOutlined onClick={showDrawer} className={style.menu_btn} />
            <Link to="/" className={style.title}>
              <span className={style.gal}>Gal</span>
              <span className={style.connection}>Connection</span>
            </Link>
          </div>
          <SearchInput
            onSearch={(val) => {
              if (val !== '') navigate(`/search/${val}`)
            }}
          />
          <div className={style.right}>
            <MailOutlined className={style.actionIcon} />
            <MessageOutlined className={style.actionIcon} />
            <Dropdown overlay={menu}>
              <Avatar className={style.avatar} src={user.avatar} size={40} />
            </Dropdown>
          </div>
          <Drawer
            width="250px"
            title={<div className={style.title}>GalConnection</div>}
            placement="left"
            onClose={onClose}
            open={drawervisible}
          ></Drawer>
        </header>
      )}
    </Observer>
  )
}

export default TopNav
