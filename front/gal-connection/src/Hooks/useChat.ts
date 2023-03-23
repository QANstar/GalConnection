import { useCallback, useEffect, useState } from 'react'
import * as chatService from '../service/chat'
import stores from '../store'
import { IChatContent, IChatRoom, IChatRoomOfUser } from '../types/type'

const limit = 10

const useChat = () => {
  const { signalR } = stores
  const [chatRooms, setChatRooms] = useState<IChatRoomOfUser[]>([])
  const [chatContents, setChatContents] = useState<IChatContent[]>([])
  const [currentRoom, setCurrentRoom] = useState<IChatRoom>()
  const [unReadCount, setUnReadCount] = useState<number>(0)
  const [hasNext, setHasNext] = useState(false)
  const [next, setNext] = useState(0)
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

  // 获取更多聊天内容列表
  const getMoreChatContentList = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await chatService.getChatContentList({
        roomId: currentRoom?.id || 0,
        nextId: next,
        limit
      })
      if (status === 200) {
        if (data.messages.length > 0) {
          setNext(data.messages[0].id)
          setChatContents(data.messages.concat(chatContents))
        }
        setHasNext(data.hasNext)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [next, chatContents, currentRoom])

  // 获取初始聊天内容
  const getFirstChatContentList = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const { data, status } = await chatService.getChatContentList({
        roomId: currentRoom?.id || 0,
        nextId: 0,
        limit
      })
      if (status === 200) {
        if (data.messages.length > 0) {
          setNext(data.messages[0].id)
        }
        setChatContents(data.messages)
        setHasNext(data.hasNext)
      }
    } catch (e: any) {
      setError(e)
    } finally {
      setLoading(false)
    }
  }, [chatContents, currentRoom])

  // 获取未读数量
  const getUnReadNum = useCallback(async () => {
    try {
      setError('')
      const { data, status } = await chatService.getUnReadNum()
      if (status === 200) {
        setUnReadCount(data)
      }
    } catch (e: any) {
      setError(e)
    }
  }, [])

  // 获取指定两个用户的聊天室
  const getChatRoomByUserId = useCallback(
    async (targetUserId: number) => {
      if (targetUserId === 0) {
        setCurrentRoom(undefined)
        return
      }
      try {
        setLoading(true)
        setError('')
        const { data, status } = await chatService.getChatRoomByUserId(
          targetUserId
        )
        if (status === 200) {
          setCurrentRoom(data)
          if (!chatRooms.find((x) => x.id === data.id)) {
            chatRooms.unshift(data)
            setChatRooms([...chatRooms])
          }
        }
      } catch (e: any) {
        setError(e)
      } finally {
        setLoading(false)
      }
    },
    [chatRooms]
  )

  // 改变房间
  const changeRoom = useCallback(
    async (room?: IChatRoom) => {
      if (currentRoom) {
        exitRoom(currentRoom.id)
      }
      setCurrentRoom(room)
    },
    [currentRoom]
  )

  // 发送消息
  const sendMessage = useCallback(
    async (words: string) => {
      if (currentRoom) addChat({ roomId: currentRoom.id, words })
    },
    [currentRoom]
  )

  // 加入房间
  const joinRoom = useCallback(async (roomId: number) => {
    if (signalR.connection) {
      signalR.connection.send('JoinRoom', roomId)
    }
  }, [])

  // 离开房间
  const exitRoom = useCallback(async (roomId: number) => {
    if (signalR.connection) {
      signalR.connection.send('ExitRoom', roomId)
    }
  }, [])

  // 添加聊天
  const addChat = useCallback(
    async (val: { roomId: number; words: string }) => {
      if (signalR.connection) {
        signalR.connection.send('AddChat', val)
      }
    },
    []
  )

  // 接受聊天
  const getChatMessage = useCallback(async () => {
    if (signalR.connection) {
      signalR.connection.on('GetChatMessage', (content: string) => {
        const res: IChatContent = JSON.parse(content)
        setChatContents((item) => {
          item.push(res)
          const newItem = [...item]
          return newItem
        })
        setNext(res.id)
      })
    }
  }, [chatContents])

  // 获取未读总数
  const getUnReadNumListen = useCallback(async () => {
    if (signalR.connection) {
      signalR.connection.on('GetUnReadNum', (num: number) => {
        setUnReadCount(num)
      })
    }
  }, [chatContents])

  // 获取聊天室列表信息
  const getChatRoomOfUser = useCallback(async () => {
    if (signalR.connection) {
      signalR.connection.on('GetChatRoomOfUser', (res: string) => {
        const roomInfo: IChatRoomOfUser = JSON.parse(res)
        setChatRooms((rooms) => {
          const room = rooms.find((x) => x.id === roomInfo.id)
          if (room) {
            room.lastWords = roomInfo.lastWords
            room.lastWordsTime = roomInfo.lastWordsTime
            room.unReadNum = roomInfo.unReadNum
          } else {
            rooms.unshift(roomInfo)
          }
          console.log(rooms)

          const newRooms = [...rooms]
          return newRooms
        })
      })
    }
  }, [chatContents])

  // signalR移除监听
  const removeSignalRListen = useCallback(async () => {
    if (signalR.connection) {
      signalR.connection.off('GetChatMessage')
      signalR.connection.off('GetUnReadNum')
    }
  }, [])

  // signalR监听
  const signalRListen = useCallback(async () => {
    getChatMessage()
    getUnReadNumListen()
    getChatRoomOfUser()
  }, [chatContents])

  useEffect(() => {
    getAllChatRoomsOfUser()
    signalRListen()
    getUnReadNum()
    return () => {
      removeSignalRListen()
    }
  }, [])

  useEffect(() => {
    setNext(0)
    if (currentRoom) {
      joinRoom(currentRoom.id)
      getFirstChatContentList()
    }
  }, [currentRoom])

  return {
    chatRooms,
    loading,
    error,
    currentRoom,
    chatContents,
    hasNext,
    unReadCount,
    getMoreChatContentList,
    getChatRoomByUserId,
    changeRoom,
    getAllChatRoomsOfUser,
    sendMessage
  }
}

export default useChat
