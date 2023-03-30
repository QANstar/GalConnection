import { Divider, Skeleton } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import GameShowList from '../../../Components/GameShowList'
import useHomeGames from '../../../Hooks/useHomeGames'
import MoreGames from './MoreGames'
import style from './style.module.scss'

function Home () {
  const { games, getData, hasNext } = useHomeGames('recommend')
  const [moreGamesOpen, setMoreGamesOpen] = useState(true)
  return (
    <div className={style.home}>
      <div
        id="scrollableDiv"
        className={
          moreGamesOpen ? style.recommender : style.recommenderMoreUnOpen
        }
      >
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          dataLength={games.length}
          next={getData}
          hasMore={hasNext}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>没有更多了 🤐</Divider>}
        >
          <GameShowList
            onItemClick={(gameData) => {
              window.open(`/engine/${gameData.id}/info`)
            }}
            games={games}
          />
        </InfiniteScroll>
      </div>
      <div className={moreGamesOpen ? style.more : style.moreUnOpen}>
        <MoreGames
          moreGamesOpen={moreGamesOpen}
          onMoreClick={() => {
            setMoreGamesOpen(!moreGamesOpen)
          }}
        />
      </div>
    </div>
  )
}

export default Home
