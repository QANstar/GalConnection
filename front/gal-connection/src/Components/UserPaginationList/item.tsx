import { UserOutlined } from '@ant-design/icons'
import { Avatar, Button, Tag } from 'antd'
import React from 'react'
import { IUser } from '../../types/type'
import style from './style.module.scss'

interface IUserItemProps {
  user: IUser
  onFllowClick: (user: IUser) => void
  onUserClick: (user: IUser) => void
}

function UserItem (props: IUserItemProps) {
  return (
    <div className={style.item}>
      <div className={style.avatar}>
        <Avatar
          onClick={() => props.onUserClick(props.user)}
          size={85}
          icon={<UserOutlined />}
          src={props.user.avatar}
        />
      </div>
      <div className={style.info}>
        <div className={style.nickname}>
          <span
            onClick={() => props.onUserClick(props.user)}
            className={style.name}
          >
            {props.user.nickname}
          </span>
          <Tag color="#87d068">id: {props.user.id}</Tag>
        </div>
        <div className={style.intro}>{props.user.introduce}</div>
        <Button onClick={() => props.onFllowClick(props.user)} type="primary">
          关注
        </Button>
      </div>
    </div>
  )
}

export default UserItem
