import { Avatar, List, Pagination } from 'antd'
import React from 'react'
import stores from '../../store'
import { IComment } from '../../types/type'
import { getRelativeTime } from '../../Utils/TimeUtils'
import ChatInput from '../Chat/ChatInput'
import style from './style.module.scss'

interface ICommentsProps {
  comments: IComment[]
  onAddClick: (val: string) => void
  total: number
  current: number
  limit: number
  onPageChange: (page: number) => void
}

function Comments (props: ICommentsProps) {
  const { comments, onAddClick } = props
  const { user } = stores
  return (
    <div className={style.comments}>
      <div className={style.add}>
        <Avatar
          style={{ cursor: 'pointer', marginRight: 30 }}
          onClick={() => {
            window.open(`/userCenter/${user.id}`)
          }}
          size={50}
          src={user.avatar}
        />
        <ChatInput onSendMessage={onAddClick} />
      </div>
      <List
        dataSource={comments}
        renderItem={(item) => (
          <List.Item className={style.list} key={item.id}>
            <List.Item.Meta
              avatar={
                <Avatar
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    window.open(`/userCenter/${item.user.id}`)
                  }}
                  size="large"
                  src={item.user.avatar}
                />
              }
              title={
                <div>
                  <span
                    className={style.nickename}
                    onClick={() => window.open(`/userCenter/${item.user.id}`)}
                  >
                    {item.user.nickname}
                  </span>
                  <div className={style.content}>{item.commentContent}</div>
                  <div className={style.time}>
                    {getRelativeTime(item.createTime)}
                  </div>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <div className={style.page}>
        <Pagination
          onChange={(current) => {
            props.onPageChange(current)
          }}
          pageSize={props.limit}
          defaultCurrent={props.current}
          total={props.total}
        />
      </div>
    </div>
  )
}

export default Comments
