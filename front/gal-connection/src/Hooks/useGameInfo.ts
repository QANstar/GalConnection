import { useCallback, useEffect, useState } from 'react'
import { ICreateGame, IGameCreateInfo } from '../types/type'
import * as fileService from '../service/game'
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
      const { data, status } = await fileService.getCreateGamesInfoById(gameId)
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
        const { status } = await fileService.editGame(newGameInfo)
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

  useEffect(() => {
    getCreateGamesInfoById()
  }, [gameId])

  return {
    gameInfo,
    loading,
    error,
    editGame
  }
}

export default useGameInfo
