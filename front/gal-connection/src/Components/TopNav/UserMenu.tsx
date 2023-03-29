import {
  FolderOutlined,
  FormOutlined,
  LogoutOutlined,
  RightOutlined,
  StarOutlined,
  UserOutlined
} from '@ant-design/icons'
import { Avatar, Divider, Popover } from 'antd'
import { Observer } from 'mobx-react'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import useUser from '../../Hooks/useUser'

import style from './style.module.scss'

function UserMenu () {
  const { user, logout } = useUser()
  const [hovered, setHovered] = useState(false)

  const menuContent = useMemo(() => {
    return (
      <div className={style.menu}>
        <div className={style.userInfo}>
          <div className={style.nickname}>{user.nickname}</div>
          <div className={style.follow}>
            <Link to={`/follows/${user.id}`}>关注: {user.followCount}</Link>
            <Link to={`/fans/${user.id}`}>粉丝: {user.fansCount}</Link>
          </div>
        </div>
        <div className={style.menuList}>
          <Link className={style.menuItem} to={`/userCenter/${user.id}`}>
            <div>
              <UserOutlined className={style.menuIcon} />
              用户中心
            </div>
            <RightOutlined />
          </Link>
          <Link className={style.menuItem} to={`/moreUserStar/${user.id}`}>
            <div>
              <StarOutlined className={style.menuIcon} />
              我的收藏
            </div>
            <RightOutlined />
          </Link>
          <Link className={style.menuItem} to={`/myMaterial/${user.groupId}/0`}>
            <div>
              <FolderOutlined className={style.menuIcon} /> 素材中心
            </div>
            <RightOutlined />
          </Link>
          <Link className={style.menuItem} to={'/creation'}>
            <div>
              <FormOutlined className={style.menuIcon} />
              创作中心
            </div>
            <RightOutlined />
          </Link>
          <Divider style={{ margin: '5px 0' }} />
          <div className={style.logoutMenuItem} onClick={logout}>
            <div>
              <LogoutOutlined className={style.menuIcon} />
              登出
            </div>
            <RightOutlined />
          </div>
        </div>
      </div>
    )
  }, [user])

  return (
    <Observer>
      {() => (
        <Popover
          placement="bottomRight"
          content={menuContent}
          trigger="hover"
          open={hovered}
          onOpenChange={setHovered}
          showArrow={false}
          style={{ zIndex: 1 }}
        >
          <div className={style.userAvatarMask}>
            <Avatar
              className={hovered ? style.activeAcatar : style.avatar}
              src={user.avatar}
              size={40}
            />
          </div>
        </Popover>
      )}
    </Observer>
  )
}

export default UserMenu
