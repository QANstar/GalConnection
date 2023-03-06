import { useCallback, useEffect, useState } from 'react'
import * as gameService from '../service/game'
import { IGame } from '../types/type'

const useHomeGames = () => {
  const [gameRecommenderList, setGameRecommenderList] = useState<IGame[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取游戏推荐
  const getRecommenderGameList = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getRecommenderGameList()
      if (status === 200) {
        setGameRecommenderList(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getRecommenderGameList()
  }, [])

  return {
    gameRecommenderList,
    loading,
    error
  }
}

export default useHomeGames
