import { Avatar, Button } from 'antd'
import { Observer } from 'mobx-react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useUser from '../../../Hooks/useUser'
import { IUser } from '../../../types/type'
import style from './style.module.scss'

function UserCenter () {
  const { nickname } = useParams()
  const [userInfo, setUserInfo] = useState<IUser>()
  const { getUserInfo } = useUser()

  const getUser = async () => {
    if (nickname) {
      const res = await getUserInfo(nickname)
      if (res) setUserInfo(res)
    }
  }

  useEffect(() => {
    getUser()
  }, [])
  return (
    <Observer>
      {() => (
        <div className={style.main}>
          <div
            className={style.banner}
            style={{
              backgroundImage: `url(${userInfo ? userInfo.banner : ''})`
            }}
          />
          <div className={style.content}>
            <div className={style.top_info}>
              <div className={style.user_info_cover}>
                <Avatar
                  className={style.avatar}
                  src={userInfo ? userInfo.avatar : ''}
                  size={130}
                />
                <div className={style.user_info}>
                  <div className={style.nickname}>
                    {userInfo ? userInfo.nickname : 'test'}
                  </div>
                  <div className={style.introuduce}>介绍</div>
                </div>
              </div>
              <div className={style.top_info_action}>
                <Button type="primary">关注</Button>
              </div>
            </div>
            <div className={style.mygame}>
              <div className={style.title}>我的创作</div>
            </div>
          </div>
        </div>
      )}
    </Observer>
  )
}

export default UserCenter
