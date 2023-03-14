import { RightOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Divider, Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import UserPaginationList from '../../../Components/UserPaginationList'
import useUser from '../../../Hooks/useUser'
import useUserList from '../../../Hooks/useUserList'
import { IUser } from '../../../types/type'
import style from './style.module.scss'

function FansList () {
  const navigate = useNavigate()
  const { userId } = useParams()
  const { userList, page, total, limit, setPage, followUser, unFollowUser } =
    useUserList('fans', {
      userId: parseInt(userId || '0')
    })
  const [userInfo, setUserInfo] = useState<IUser>()
  const { getUserInfo } = useUser()

  const getUser = async () => {
    if (userId) {
      const res = await getUserInfo(parseInt(userId))
      if (res) {
        setUserInfo(res)
      } else {
        navigate('/userNotFound')
      }
    }
  }

  useEffect(() => {
    getUser()
  }, [userId])

  return (
    <div className={style.main}>
      <div className={style.title}>
        {userInfo && (
          <Divider orientation="left">
            <div className={style.userInfo}>
              <Avatar
                style={{ cursor: 'pointer' }}
                onClick={() => navigate(`/userCenter/${userInfo.id}`)}
                size={50}
                icon={<UserOutlined />}
                src={userInfo.avatar}
              />
              <span
                onClick={() => navigate(`/userCenter/${userInfo.id}`)}
                className={style.nickname}
              >
                {userInfo?.nickname}
              </span>
              的粉丝
              <Link className={style.link} to={`/follows/${userInfo?.id}`}>
                前往关注页
                <RightOutlined />
              </Link>
            </div>
          </Divider>
        )}
      </div>
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

export default FansList
