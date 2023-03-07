import { Empty, message } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import UserPaginationList from '../../../Components/UserPaginationList'
import useUserList from '../../../Hooks/useUserList'
import style from './style.module.scss'

function SearchUserPage () {
  const { content } = useParams()
  const { userList, page, total, limit, setPage } = useUserList({
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
          onFllowClick={() => {
            message.warning('功能开发中，敬请期待')
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
