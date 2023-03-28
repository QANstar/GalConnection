import { useCallback, useEffect, useState } from 'react'
import { IComment } from '../types/type'
import * as gameService from '../service/game'
import { message } from 'antd'

const limit = 10

const useComment = (gameId: number) => {
  const [comments, setComments] = useState<IComment[]>([])
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取评论
  const getComment = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getComment(
        gameId,
        (page - 1) * limit,
        limit
      )
      if (status === 200) {
        setComments(data.comments)
        setTotal(data.total)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [gameId, limit, page])

  // 添加评论
  const addComment = useCallback(
    async (params: { gameId: number; commentContent: string }) => {
      try {
        setLoading(true)
        setError('')
        const { data, status } = await gameService.addComment(params)
        if (status === 200) {
          message.success('评论成功')
          comments.unshift(data)
          setComments([...comments])
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [comments]
  )

  useEffect(() => {
    getComment()
  }, [gameId, page, limit])

  return {
    loading,
    error,
    comments,
    page,
    total,
    limit,
    setPage,
    addComment
  }
}

export default useComment
