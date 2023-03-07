import { PlayCircleOutlined, UserOutlined } from '@ant-design/icons'
import { Menu, MenuProps } from 'antd'
import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import style from './style.module.scss'

const items: MenuProps['items'] = [
  {
    label: '游戏',
    key: 'games',
    icon: <PlayCircleOutlined />
  },
  {
    label: '用户',
    key: 'users',
    icon: <UserOutlined />
  }
]

function SearchPage () {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className={style.main}>
      <Menu
        onSelect={(data) => {
          navigate(data.key)
        }}
        selectedKeys={[
          location.pathname.split('/')[location.pathname.split('/').length - 1]
        ]}
        mode="horizontal"
        items={items}
      />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default SearchPage
