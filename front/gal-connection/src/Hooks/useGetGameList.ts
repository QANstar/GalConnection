import { useCallback, useEffect, useState } from 'react'
import { IGame } from '../types/type'
import * as gameService from '../service/game'

type GetGameType = 'selfCreate'

const useGetGameList = (type: GetGameType) => {
  const [gameList, setGameList] = useState<IGame[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取指定文件夹下所有文件
  const getGamesOfUser = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getGamesOfUser()
      if (status === 200) {
        setGameList(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (type === 'selfCreate') {
      getGamesOfUser()
    }
  }, [type])

  return {
    gameList,
    loading,
    error
  }
}

export default useGetGameList
