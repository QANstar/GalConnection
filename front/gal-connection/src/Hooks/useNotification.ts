import { useCallback, useEffect, useState } from 'react'
import { INotification } from '../types/type'
import * as notificationsService from '../service/notifications'

const limit = 10

const useNotification = () => {
  const [notifications, setNotifications] = useState<INotification[]>([])
  const [notificationsCount, setNotificationsCount] = useState<number>(0)
  const [hasNext, setHasNext] = useState(false)
  const [next, setNext] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取台词
  const getNotifications = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await notificationsService.getNotifications({
        nextId: next,
        limit
      })
      if (status === 200) {
        if (data.notifications.length > 0) {
          setNext(data.notifications[data.notifications.length - 1].id)
        }
        setNotifications(notifications.concat(data.notifications))
        setHasNext(data.hasNext)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [next, notifications])

  // 获取未读数量
  const getUnReadNum = useCallback(async () => {
    try {
      setError('')
      const { data, status } = await notificationsService.getUnReadNum()
      if (status === 200) {
        setNotificationsCount(data)
      }
    } catch (e: any) {
      setError(e)
    }
  }, [next, notifications])

  // 设置已读
  const read = useCallback(
    async (notificationid: number) => {
      try {
        setError('')
        const { status } = await notificationsService.read(notificationid)
        if (status === 200) {
          const item = notifications.find((x) => x.id === notificationid)
          if (item) {
            item.isRead = true
            setNotifications([...notifications])
          }
          getUnReadNum()
        }
      } catch (e: any) {
        setError(e)
      }
    },
    [notifications]
  )

  // 全部已读
  const readAll = useCallback(async () => {
    try {
      setError('')
      const { status } = await notificationsService.readAll()
      if (status === 200) {
        for (const item of notifications) {
          item.isRead = true
        }
        setNotifications([...notifications])
        getUnReadNum()
      }
    } catch (e: any) {
      setError(e)
    }
  }, [notifications])

  useEffect(() => {
    getNotifications()
    getUnReadNum()
  }, [])

  return {
    notifications,
    error,
    loading,
    hasNext,
    notificationsCount,
    getNotifications,
    read,
    readAll
  }
}

export default useNotification
