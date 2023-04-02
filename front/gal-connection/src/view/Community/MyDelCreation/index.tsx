import React from 'react'
import GamePaginationList from '../../../Components/GamePaginationList'
import useGetGameList from '../../../Hooks/useGetGameList'
import style from './style.module.scss'
import { Modal } from 'antd'
import { ExclamationCircleFilled } from '@ant-design/icons'
const { confirm } = Modal

function MyDelCreation () {
  const {
    gameList,
    page,
    total,
    limit,
    setPage,
    completelyDelGame,
    restoreGame
  } = useGetGameList('delete')

  return (
    <div className={style.main}>
      <GamePaginationList
        games={gameList}
        current={page}
        total={total}
        limit={limit}
        onPageChange={setPage}
        onItemClick={() => {}}
        isRecycleBin
        onRestoreClick={(gameid) => {
          confirm({
            title: '确定还原此游戏?',
            icon: <ExclamationCircleFilled />,
            onOk () {
              restoreGame(gameid)
            },
            okText: '确定',
            cancelText: '取消'
          })
        }}
        onDelClick={(gameid) => {
          confirm({
            title: '确定彻底删除此游戏?',
            icon: <ExclamationCircleFilled />,
            onOk () {
              completelyDelGame(gameid)
            },
            okText: '确定',
            cancelText: '取消'
          })
        }}
      />
    </div>
  )
}

export default MyDelCreation
