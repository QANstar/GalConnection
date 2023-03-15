import { useCallback, useEffect, useState } from 'react'
import { ICreateGame, IGameCreateInfo } from '../types/type'
import * as gameService from '../service/game'
import { message } from 'antd'

const useGameInfo = (gameId: number) => {
  const [gameInfo, setGameInfo] = useState<IGameCreateInfo | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 通过游戏id获取创建游戏信息
  const getCreateGamesInfoById = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getCreateGamesInfoById(gameId)
      if (status === 200) {
        setGameInfo(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId])

  // 编辑游戏创建信息
  const editGame = useCallback(
    async (newGameInfo: ICreateGame) => {
      try {
        setLoading(true)
        setError('')
        newGameInfo.id = gameId
        const { status } = await gameService.editGame(newGameInfo)
        if (status === 200) {
          getCreateGamesInfoById()
          message.success('编辑成功')
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId]
  )

  // 发布游戏
  const gamePublish = useCallback(
    async (params: { gameId: number; isPublish: boolean }) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.gamePublish(params)
        if (status === 200) {
          getCreateGamesInfoById()
          if (params.isPublish) {
            message.success('发布成功')
          } else {
            message.success('取消发布成功')
          }
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId]
  )

  // 删除游戏
  const delGame = useCallback(
    async (params: { gameId: number }) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.delGame(params)
        if (status === 200) {
          message.success('删除成功')
          return true
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId]
  )

  // 收藏游戏
  const star = useCallback(
    async (gameId: number) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.star(gameId)
        if (status === 200) {
          getCreateGamesInfoById()
          return true
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, gameInfo]
  )

  // 取消收藏游戏
  const unStar = useCallback(
    async (gameId: number) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.unStar(gameId)
        if (status === 200) {
          getCreateGamesInfoById()
          return true
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, gameInfo]
  )

  // 点赞
  const like = useCallback(
    async (gameId: number) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.like(gameId)
        if (status === 200) {
          getCreateGamesInfoById()
          return true
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, gameInfo]
  )

  // 取消点赞
  const unLike = useCallback(
    async (gameId: number) => {
      try {
        setLoading(true)
        setError('')
        const { status } = await gameService.unLike(gameId)
        if (status === 200) {
          getCreateGamesInfoById()
          return true
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [gameId, gameInfo]
  )

  useEffect(() => {
    getCreateGamesInfoById()
  }, [gameId])

  return {
    gameInfo,
    loading,
    error,
    editGame,
    gamePublish,
    delGame,
    star,
    unStar,
    like,
    unLike
  }
}

export default useGameInfo
