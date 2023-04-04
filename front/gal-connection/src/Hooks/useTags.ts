import { useCallback, useEffect, useState } from 'react'
import * as gameService from '../service/game'

const useTags = () => {
  const [tags, setTags] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取top10标签
  const getTopTags = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await gameService.getTopTags()
      if (status === 200) {
        setTags(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const getData = () => {
    getTopTags()
  }

  useEffect(() => {
    getData()
  }, [])

  return {
    tags,
    loading,
    error,
    getData
  }
}

export default useTags
