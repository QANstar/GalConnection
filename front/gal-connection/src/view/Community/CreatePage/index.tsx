import {
  CloudOutlined,
  ClusterOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  FileOutlined,
  FormOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlayCircleOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { Button, Menu, MenuProps, Modal } from 'antd'
import React, { useState } from 'react'
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom'
import useGameInfo from '../../../Hooks/useGameInfo'
import { GameState } from '../../../types/enums'
import style from './style.module.scss'
const { confirm } = Modal
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
  const { gameInfo, gamePublish, delGame } = useGameInfo(
    parseInt(gameId || '0')
  )
  const items: MenuItem[] = [
    getItem('游戏信息', 'info', <SettingOutlined />),
    getItem('素材绑定', 'material', <FileOutlined />),
    getItem('游戏事件', 'event', <ClusterOutlined />),
    getItem('游戏内容', 'lines/0/0', <FormOutlined />)
  ]

  return (
    <div className={style.main}>
      <div style={{ width: collapsed ? 80 : 165 }} className={style.navMenu}>
        <div>
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

        <div style={{ marginBottom: 40 }} className={style.collapsedBtn}>
          <Button
            block
            danger={gameInfo?.state === GameState.PUBLISH}
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => {
              confirm({
                title:
                  gameInfo?.state === GameState.PUBLISH
                    ? '确定要取消发布此游戏?'
                    : '确定要发布此游戏?',
                icon: <ExclamationCircleFilled />,
                content: '你可以随时在这进行更改',
                okText: '确定',
                cancelText: '取消',
                onOk () {
                  gamePublish({
                    gameId: parseInt(gameId || '0'),
                    isPublish: gameInfo?.state !== GameState.PUBLISH
                  })
                }
              })
            }}
          >
            {collapsed
              ? (
              <CloudOutlined />
                )
              : (
              <div className={style.playBtn}>
                <CloudOutlined style={{ marginRight: 10 }} />
                {gameInfo?.state === GameState.PUBLISH ? '取消发布' : '发布'}
              </div>
                )}
          </Button>
          <Button
            block
            danger={gameInfo?.state === GameState.PUBLISH}
            type="primary"
            style={{ marginBottom: 16 }}
            onClick={() => {
              confirm({
                title: '你确定要删除此游戏？',
                icon: <ExclamationCircleFilled />,
                content: '你可以在回收站将其恢复',
                okText: '确定',
                cancelText: '取消',
                async onOk () {
                  const isSuccess = await delGame({
                    gameId: gameInfo?.id || 0
                  })
                  if (isSuccess) {
                    navigate('/creation')
                  }
                }
              })
            }}
          >
            {collapsed
              ? (
              <DeleteOutlined />
                )
              : (
              <div className={style.playBtn}>
                <DeleteOutlined style={{ marginRight: 10 }} />
                删除
              </div>
                )}
          </Button>
        </div>
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
