import {
  EllipsisOutlined,
  FireOutlined,
  MenuUnfoldOutlined,
  TeamOutlined
} from '@ant-design/icons'
import { Button, Divider, Skeleton, Tabs, TabsProps } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import GameShowList from '../../../Components/GameShowList'
import useHomeGames from '../../../Hooks/useHomeGames'
import style from './style.module.scss'

interface IMoreGamesProps {
  onMoreClick: () => void
  moreGamesOpen: boolean
}

function MoreGames (props: IMoreGamesProps) {
  const [isHotData, setIsHotData] = useState(true)
  const { games: followGames, getData, hasNext } = useHomeGames('follow')
  const { games: hotGames } = useHomeGames('hot')
  const { moreGamesOpen, onMoreClick } = props

  const items: TabsProps['items'] = [
    {
      key: 'hot',
      label: (
        <div>
          <FireOutlined /> 热门
        </div>
      )
    },
    {
      key: 'follow',
      label: (
        <div>
          <TeamOutlined /> 关注
        </div>
      )
    }
  ]

  const onChange = (key: string) => {
    if (key === 'hot') {
      setIsHotData(true)
    } else {
      setIsHotData(false)
    }
  }

  return (
    <div className={style.moreMain}>
      <div>
        <Button
          onClick={onMoreClick}
          className={moreGamesOpen ? style.moreBtn : style.moreBtnUnOpen}
          shape="round"
          icon={moreGamesOpen ? <MenuUnfoldOutlined /> : <EllipsisOutlined />}
        >
          {moreGamesOpen ? '收起' : '更多'}
        </Button>
        <Tabs
          className={style.tabs}
          centered
          defaultActiveKey="hot"
          items={items}
          onChange={onChange}
        />
      </div>

      <div className={style.moreGames} id="scrollableDiv">
        {isHotData
          ? (
          <GameShowList
            showIndex
            onItemClick={(gameData) => {
              window.open(`/engine/${gameData.id}/info`)
            }}
            games={hotGames}
          />
            )
          : (
          <InfiniteScroll
            scrollableTarget="scrollableDiv"
            dataLength={followGames.length}
            next={getData}
            hasMore={hasNext}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            endMessage={<Divider plain>没有更多了 🤐</Divider>}
          >
            <GameShowList
              onItemClick={(gameData) => {
                window.open(`/engine/${gameData.id}/info`)
              }}
              games={followGames}
            />
          </InfiniteScroll>
            )}
      </div>
    </div>
  )
}

export default MoreGames
