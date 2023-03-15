import { UserOutlined } from '@ant-design/icons'
import { Avatar, Divider, Empty } from 'antd'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import GamePaginationList from '../../../Components/GamePaginationList'
import useGetGameList from '../../../Hooks/useGetGameList'
import useUser from '../../../Hooks/useUser'
import { IUser } from '../../../types/type'
import style from './style.module.scss'

function MoreUserStar () {
  const navigate = useNavigate()
  const { userId } = useParams()
  const { gameList, page, total, limit, setPage } = useGetGameList('star', {
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
              收藏的游戏
            </div>
          </Divider>
        )}
      </div>
      {gameList.length > 0
        ? (
        <GamePaginationList
          games={gameList}
          current={page}
          total={total}
          limit={limit}
          onPageChange={setPage}
          onItemClick={(gameData) => {
            window.open(`/engine/${gameData.id}/info`)
          }}
        />
          )
        : (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
    </div>
  )
}

export default MoreUserStar
