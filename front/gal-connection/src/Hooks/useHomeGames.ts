import { useCallback, useEffect, useState } from 'react'
import * as gameService from '../service/game'
import { IGame } from '../types/type'

type dataType = 'recommend' | 'follow' | 'hot'
const limit = 10

const useHomeGames = (type: dataType, tag?: string) => {
  const [games, setGames] = useState<IGame[]>([])
  const [hasNext, setHasNext] = useState(false)
  const [next, setNext] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取游戏推荐
  const getRecommenderGameList = useCallback(
    async (isInit?: boolean) => {
      try {
        setLoading(true)
        setError('')
        const { data, status } = await gameService.getRecommenderGameList({
          tag: tag || 'all',
          lastId: isInit ? 0 : next,
          limit
        })
        if (status === 200) {
          if (data.games.length > 0) {
            setNext(data.games[data.games.length - 1].id)
            if (isInit) {
              setGames(data.games)
            } else {
              setGames(games.concat(data.games))
            }
          }
          setHasNext(data.hasNext)
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [games, limit, next, tag]
  )

  // 获取游戏推荐
  const getFollowGameList = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getFollowGameList({
        lastId: next,
        limit
      })
      if (status === 200) {
        if (data.games.length > 0) {
          setNext(data.games[data.games.length - 1].id)
          setGames(games.concat(data.games))
        }
        setHasNext(data.hasNext)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [games, limit, next])

  // 获取top10游戏
  const getTopTenGameList = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getTopTenGameList()
      if (status === 200) {
        setGames(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const getData = (isInit?: boolean) => {
    if (type === 'recommend') {
      getRecommenderGameList(isInit)
    } else if (type === 'follow') {
      getFollowGameList()
    } else if (type === 'hot') {
      getTopTenGameList()
    }
  }

  useEffect(() => {
    setHasNext(false)
    setNext(0)
    setGames([])
    getData(true)
  }, [type, tag])

  return {
    games,
    loading,
    error,
    hasNext,
    getData
  }
}

export default useHomeGames
