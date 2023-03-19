import { CheckCircleOutlined } from '@ant-design/icons'
import { Avatar, Badge, Button, Divider, List, Skeleton } from 'antd'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { NotificationType } from '../../types/enums'
import { INotification } from '../../types/type'
import { getRelativeTime } from '../../Utils/TimeUtils'
import style from './style.module.scss'

interface INotificationListProps {
  notifications: INotification[]
  hasMore: boolean
  getMore: () => void
  onUserClick: (userId: number) => void
  onReadClick: (notificationId: number) => void
  onReadAllClick: () => void
  onLinkClick: (type: NotificationType, linkId?: number) => void
}

function NotificationList (props: INotificationListProps) {
  const { notifications, hasMore, getMore } = props
  return (
    <div id="scrollableDiv" className={style.main}>
      <div className={style.header}>
        <div className={style.title}>通知</div>
        <Button
          onClick={props.onReadAllClick}
          className={style.readAll}
          type="link"
        >
          已读所有
        </Button>
      </div>
      <InfiniteScroll
        scrollableTarget="scrollableDiv"
        dataLength={notifications.length}
        next={getMore}
        hasMore={hasMore}
        loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
        endMessage={<Divider plain>没有更多了 🤐</Divider>}
      >
        <List
          dataSource={notifications}
          renderItem={(item) => (
            <List.Item className={style.list} key={item.id}>
              <List.Item.Meta
                avatar={
                  <Badge color="#ff85c0" dot={!item.isRead}>
                    <Avatar
                      style={{ cursor: 'pointer' }}
                      onClick={() =>
                        props.onUserClick(item.sourceUser?.id || 0)
                      }
                      size="large"
                      src={item.sourceUser?.avatar}
                    />
                  </Badge>
                }
                title={
                  <div>
                    <span
                      className={style.nickename}
                      onClick={() =>
                        props.onUserClick(item.sourceUser?.id || 0)
                      }
                    >
                      {item.sourceUser?.nickname}
                    </span>
                    <span
                      onClick={() => {
                        props.onLinkClick(item.type, item.linkId)
                      }}
                      className={style.content}
                    >
                      {item.notification1}
                    </span>
                  </div>
                }
                description={getRelativeTime(item.time)}
              />
              {!item.isRead && (
                <div
                  onClick={() => props.onReadClick(item.id)}
                  className={style.readBtn}
                >
                  <CheckCircleOutlined />
                </div>
              )}
            </List.Item>
          )}
        />
      </InfiniteScroll>
    </div>
  )
}

export default NotificationList
