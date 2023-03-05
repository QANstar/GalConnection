import {
  ClusterOutlined,
  FileOutlined,
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlayCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Button, Menu, MenuProps } from 'antd'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import style from './style.module.scss'
type MenuItem = Required<MenuProps>['items'][number]

function getItem (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type
  } as MenuItem
}

function CreatePage () {
  const { gameId } = useParams()
  const [collapsed, setCollapsed] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const items: MenuItem[] = [
    getItem('游戏信息', 'info', <SettingOutlined />),
    getItem('素材绑定', 'material', <FileOutlined />),
    getItem('游戏事件', 'event', <ClusterOutlined />),
    getItem('游戏内容', 'lines/0/0', <FormOutlined />)
  ]

  return (
    <div className={style.main}>
      <div style={{ width: collapsed ? 80 : 165 }} className={style.navMenu}>
        <div className={style.collapsedBtn}>
          <Button
            block
            type="default"
            onClick={() => {
              setCollapsed(!collapsed)
            }}
            style={{ marginBottom: 16 }}
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
          <a target="_blank" href={`/engine/${gameId}/info`} rel="noreferrer">
            <Button block type="default" style={{ marginBottom: 16 }}>
              {collapsed
                ? (
                <PlayCircleOutlined />
                  )
                : (
                <div className={style.playBtn}>
                  <PlayCircleOutlined style={{ marginRight: 10 }} />
                  试玩
                </div>
                  )}
            </Button>
          </a>
        </div>

        <Menu
          selectedKeys={[
            location.pathname.split('/')[
              location.pathname.split('/').length - 1
            ]
          ]}
          onSelect={(data) => {
            navigate(data.key)
          }}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div
        style={{ paddingLeft: collapsed ? 80 : 165 }}
        className={style.contain}
      >
        <Outlet />
      </div>
    </div>
  )
}

export default CreatePage
