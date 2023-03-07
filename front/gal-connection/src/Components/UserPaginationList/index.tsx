import { Pagination } from 'antd'
import React from 'react'
import { IUser } from '../../types/type'
import UserList from './list'
import style from './style.module.scss'

interface IGameShowListProps {
  users: IUser[]
  onFllowClick: (user: IUser) => void
  onUserClick: (user: IUser) => void
  total: number
  current: number
  limit: number
  onPageChange: (page: number) => void
}

function UserPaginationList (props: IGameShowListProps) {
  return (
    <div className={style.main}>
      <UserList
        users={props.users}
        onUserClick={props.onUserClick}
        onFllowClick={props.onFllowClick}
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

export default UserPaginationList
