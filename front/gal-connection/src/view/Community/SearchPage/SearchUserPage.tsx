import { Empty } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import UserPaginationList from '../../../Components/UserPaginationList'
import useUserList from '../../../Hooks/useUserList'
import style from './style.module.scss'

function SearchUserPage () {
  const { content } = useParams()
  const { userList, page, total, limit, setPage, followUser, unFollowUser } =
    useUserList('search', {
      searchContent: content
    })

  return (
    <div className={style.main}>
      {userList.length > 0
        ? (
        <UserPaginationList
          users={userList}
          current={page}
          total={total}
          limit={limit}
          onPageChange={setPage}
          onUserClick={(userData) => {
            window.open(`/userCenter/${userData.id}`)
          }}
          onFllowClick={(val) => {
            if (val.isFollow) {
              unFollowUser(val.id)
            } else {
              followUser(val.id)
            }
          }}
        />
          )
        : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
    </div>
  )
}

export default SearchUserPage
