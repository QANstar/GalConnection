import { useCallback, useEffect, useState } from 'react'
import * as chatService from '../service/chat'
import { IChatRoom } from '../types/type'

const useChat = () => {
  const [chatRooms, setChatRooms] = useState<IChatRoom[]>([])
  const [currentRoomId, setCurrentRoomId] = useState<number>(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // 获取用户所有的聊天房间
  const getAllChatRoomsOfUser = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await chatService.getAllChatRoomsOfUser()
      if (status === 200) {
        setChatRooms(data)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [])

  // 获取指定两个用户的聊天室
  const getChatRoomByUserId = useCallback(
    async (targetUserId: number) => {
      if (targetUserId === 0) {
        setCurrentRoomId(0)
        return
      }
      try {
        setLoading(true)
        setError('')
        const { status } = await chatService.getChatRoomByUserId(targetUserId)
        if (status === 200) {
          getAllChatRoomsOfUser()
          console.log(currentRoomId)
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [chatRooms]
  )

  useEffect(() => {
    getAllChatRoomsOfUser()
  }, [])

  return {
    chatRooms,
    loading,
    error,
    getChatRoomByUserId,
    setCurrentRoomId,
    getAllChatRoomsOfUser
  }
}

export default useChat
