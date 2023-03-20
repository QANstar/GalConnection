import { BellOutlined, MenuOutlined, MessageOutlined } from '@ant-design/icons'
import { Avatar, Badge, Drawer, Dropdown, Menu, Popover } from 'antd'
import { Observer } from 'mobx-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useNotification from '../../Hooks/useNotification'
import useUser from '../../Hooks/useUser'
import stores from '../../store'
import { NotificationType } from '../../types/enums'
import Chat from '../Chat'
import NotificationList from '../NotificationList'
import SearchInput from '../SearchInput'
import style from './style.module.scss'

function TopNav () {
  const navigate = useNavigate()
  const { user, logout } = useUser()
  const [drawervisible, setDrawerVisible] = useState(false)
  const {
    notificationsCount,
    notifications,
    hasNext,
    getNotifications,
    read,
    init,
    readAll
  } = useNotification()
  const [notificationOpen, setNotificationOpen] = useState(false)
  const { chatCard } = stores
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
            <Popover
              placement="bottomRight"
              content={
                <NotificationList
                  onLinkClick={(type, linkId) => {
                    switch (type) {
                      case NotificationType.FOLLOW:
                        window.open(`/userCenter/${linkId}`)
                        break
                      case NotificationType.LIKEGAME:
                      case NotificationType.STAR:
                        window.open(`/engine/${linkId}/info`)
                        break
                      default:
                        break
                    }
                  }}
                  onReadAllClick={readAll}
                  onReadClick={read}
                  onUserClick={(userId) => {
                    window.open(`/userCenter/${userId}`)
                  }}
                  notifications={notifications}
                  hasMore={hasNext}
                  getMore={getNotifications}
                />
              }
              trigger="click"
              showArrow={false}
              open={notificationOpen}
              onOpenChange={(visable) => {
                if (visable) {
                  init()
                }
                setNotificationOpen(visable)
              }}
            >
              <Badge
                color="#ff85c0"
                offset={[-8, 10]}
                className={style.actionIcon}
                count={notificationsCount}
              >
                <BellOutlined />
              </Badge>
            </Popover>

            <Popover
              placement="bottomRight"
              content={<Chat selectUserId={chatCard.selectUserId} />}
              trigger="click"
              showArrow={false}
              open={chatCard.open}
              onOpenChange={(visable) => {
                chatCard.setOpen(visable)
                if (!visable) {
                  chatCard.init()
                }
              }}
            >
              <Badge
                color="#ff85c0"
                offset={[-8, 10]}
                className={style.actionIcon}
                count={5}
              >
                <MessageOutlined />
              </Badge>
            </Popover>

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
