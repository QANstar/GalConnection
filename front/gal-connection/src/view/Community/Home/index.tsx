import { Divider, Skeleton } from 'antd'
import React, { useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import GameShowList from '../../../Components/GameShowList'
import useHomeGames from '../../../Hooks/useHomeGames'
import MoreGames from './MoreGames'
import style from './style.module.scss'
import TagList from '../../../Components/TagList'
import useTags from '../../../Hooks/useTags'
import { useNavigate, useParams } from 'react-router-dom'

function Home () {
  const { tag } = useParams()
  const navigate = useNavigate()
  const { games, getData, hasNext, loading } = useHomeGames('recommend', tag)
  const { tags } = useTags()
  const [moreGamesOpen, setMoreGamesOpen] = useState(true)
  return (
    <div className={style.home}>
      <div
        id="scrollableDiv"
        className={
          moreGamesOpen ? style.recommender : style.recommenderMoreUnOpen
        }
      >
        <TagList
          onItemClick={(itemTag) => {
            navigate(`/tag/${itemTag}`)
          }}
          activeTag={tag || 'all'}
          tags={tags}
        />
        <InfiniteScroll
          scrollableTarget="scrollableDiv"
          dataLength={games.length}
          next={getData}
          hasMore={hasNext}
          loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
          endMessage={<Divider plain>没有更多了 🤐</Divider>}
        >
          <GameShowList
            loading={loading}
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
