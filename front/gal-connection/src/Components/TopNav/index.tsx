import { BellOutlined, MenuOutlined, MessageOutlined } from '@ant-design/icons'
import { Badge, Drawer, Popover } from 'antd'
import { Observer } from 'mobx-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useChat from '../../Hooks/useChat'
import useNotification from '../../Hooks/useNotification'
import stores from '../../store'
import { NotificationType } from '../../types/enums'
import Chat from '../Chat'
import NotificationList from '../NotificationList'
import SearchInput from '../SearchInput'
import style from './style.module.scss'
import UserMenu from './UserMenu'

function TopNav () {
  const navigate = useNavigate()
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
  const {
    chatRooms,
    currentRoom,
    chatContents,
    hasNext: chatHasNext,
    unReadCount,
    getChatRoomByUserId,
    changeRoom,
    sendMessage,
    getMoreChatContentList
  } = useChat()
  const [notificationOpen, setNotificationOpen] = useState(false)
  const { chatCard } = stores
  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
  }

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
              content={
                <Chat
                  hasNext={chatHasNext}
                  getMore={getMoreChatContentList}
                  chatContents={chatContents}
                  onSendMessage={sendMessage}
                  selectUserId={chatCard.selectUserId}
                  getChatRoomByUserId={getChatRoomByUserId}
                  chatRooms={chatRooms}
                  currentRoom={currentRoom}
                  onItemClick={changeRoom}
                />
              }
              trigger="click"
              showArrow={false}
              open={chatCard.open}
              onOpenChange={(visable) => {
                chatCard.setOpen(visable)
                if (!visable) {
                  changeRoom(undefined)
                  chatCard.init()
                }
              }}
            >
              <Badge
                color="#ff85c0"
                offset={[-8, 10]}
                className={style.actionIcon}
                count={unReadCount}
              >
                <MessageOutlined />
              </Badge>
            </Popover>

            <UserMenu />
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
