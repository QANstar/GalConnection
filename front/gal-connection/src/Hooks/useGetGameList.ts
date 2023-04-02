import { useCallback, useEffect, useState } from 'react'
import { IGame } from '../types/type'
import * as gameService from '../service/game'
import { message } from 'antd'

type GetGameType = 'selfCreate' | 'search' | 'publish' | 'star' | 'delete'

interface IGameRequestData {
  searchContent?: string
  userId?: number
}

const limit = 12

const useGetGameList = (type: GetGameType, reqData?: IGameRequestData) => {
  const [gameList, setGameList] = useState<IGame[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取指定文件夹下所有文件
  const getGamesOfUser = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getGamesOfUser(
        (page - 1) * limit,
        limit
      )
      if (status === 200) {
        setGameList(data.games)
        setTotal(data.total)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [reqData?.searchContent, limit, page, type])

  // 获取指定文件夹下所有文件
  const searchGame = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.searchGame(
        reqData?.searchContent || '',
        (page - 1) * limit,
        limit
      )
      if (status === 200) {
        setGameList(data.games)
        setTotal(data.total)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [reqData?.searchContent, limit, page, type])

  // 获取用户发布的游戏
  const getGameOfUserPublish = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getGameOfUserPublish(
        reqData?.userId || 0,
        (page - 1) * limit,
        limit
      )
      if (status === 200) {
        setGameList(data.games)
        setTotal(data.total)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [reqData?.searchContent, reqData?.userId, limit, page, type])

  // 获取用户删除的游戏
  const getDelGameOfUser = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getDelGameOfUser(
        (page - 1) * limit,
        limit
      )
      if (status === 200) {
        setGameList(data.games)
        setTotal(data.total)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [reqData?.searchContent, reqData?.userId, limit, page, type])

  // 获取用户收藏的游戏
  const getStarGame = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getStarGame(
        reqData?.userId || 0,
        (page - 1) * limit,
        limit
      )
      if (status === 200) {
        setGameList(data.games)
        setTotal(data.total)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [reqData?.searchContent, reqData?.userId, limit, page, type])

  const completelyDelGame = useCallback(async (gameId: number) => {
    try {
      setLoading(true)
      setError('')
      const { status } = await gameService.completelyDelGame({ gameId })
      if (status === 200) {
        getData()
        message.success('彻底删除成功')
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const restoreGame = useCallback(async (gameId: number) => {
    try {
      setLoading(true)
      setError('')
      const { status } = await gameService.restoreGame({ gameId })
      if (status === 200) {
        getData()
        message.success('已还原')
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const getData = () => {
    if (type === 'selfCreate') {
      getGamesOfUser()
    } else if (type === 'search') {
      searchGame()
    } else if (type === 'publish') {
      getGameOfUserPublish()
    } else if (type === 'star') {
      getStarGame()
    } else if (type === 'delete') {
      getDelGameOfUser()
    }
  }

  useEffect(() => {
    getData()
  }, [type, reqData?.searchContent, limit, page])

  return {
    gameList,
    loading,
    error,
    page,
    total,
    limit,
    setPage,
    completelyDelGame,
    restoreGame
  }
}

export default useGetGameList
