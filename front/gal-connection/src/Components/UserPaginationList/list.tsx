import React from 'react'
import { IUser } from '../../types/type'
import UserItem from './item'
import style from './style.module.scss'

interface IUserListProps {
  users: IUser[]
  onFllowClick: (user: IUser) => void
  onUserClick: (user: IUser) => void
}

function UserList (props: IUserListProps) {
  return (
    <div className={style.list}>
      {props.users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onUserClick={props.onUserClick}
          onFllowClick={props.onFllowClick}
        />
      ))}
    </div>
  )
}

export default UserList
