import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSocket } from '@context/SocketContext'
import axiosInstance from 'services/instance'
import { jwtDecode } from 'jwt-decode'
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { IoIosPersonAdd } from 'react-icons/io'
import { IoPersonAddSharp } from 'react-icons/io5'
import { IoMdMenu, IoMdClose } from 'react-icons/io'
import chatsvg from '../../../assets/chat.svg'
import Logo from '@ui/common/molecules/Logo'
import { useAutoCorrect } from '../../../context/AutoCorrectContext'
interface User {
  unreadCount: number
  id: string
  createdAt: any
  active_status: boolean
  details: {
    first_name: string
    last_name: string
    profileImage: Media[]
    phone_number: string
  }
  email: string
}

interface Chat {
  id?: string
  receiver_id?: string
  sender_id?: string
  content?: string
  createdAt: any
  read: boolean
  sender: {
    details: {
      first_name: string
      profileImage: Media[]
    }
  }
  receiver: {
    details: {
      first_name: string
      profileImage: Media[]
    }
  }
}

interface Media {
  id: string
  path: string
}

export default function ChatOrganism() {
  const socket = useSocket()
  const [users, setUsers] = useState<User[]>([])
  const [addUsers, setAddUsers] = useState<User[]>([])
  const [typing, setTyping] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [receiverId, setReceiverId] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [message, setMessage] = useState('')
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null)
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const emojiPickerRef = useRef<HTMLDivElement>(null)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false) // New state for sidebar visibility
  const [unreadCounts, setUnreadCounts] = useState<{ [Key: string]: number }>({})

  // const [isAutoCorrectOn, setIsAutoCorrectOn] = useState(true)
  const { isAutoCorrectOn } = useAutoCorrect()

  const dictionary: Record<string, string> = {
    teh: 'the',
    receieeve: 'receive',
    adn: 'and',
  
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //The line of code let value = e.target.value; is used in JavaScript (often in the context of event handling) to capture the value of an input element or any other
    //form element that triggered the event.
    let value = e.target.value
    if (isAutoCorrectOn) {
      const words = value.split(' ')
      const correctedWords = words.map((word: string) => dictionary[word] || word)
      value = correctedWords.join(' ')
    }

    setMessage(value)
  }
  // const toggleAutoCurrect = () => {
  //   setIsAutoCorrectOn(!isAutoCorrectOn)
  // }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
        setShowEmojiPicker(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      const decoded: any = jwtDecode(token)
      setLoggedInUserId(decoded.id)
    }
    viewUsers()
    settingCurrentUser()
    viewUser()
  }, [])

  useEffect(() => {
    if (socket) {
      socket.on('message', (chat: Chat) => {
        console.log(chat, 'received chat')
        setChats((prevChats) => [...prevChats, chat])
      })
      socket.on('typing', ({ userId }) => {
        if (userId !== loggedInUserId && receiverId) {
          console.log('Typing...')
          setTyping(true)
          setTimeout(() => setTyping(false), 2000)
        }
      })
      socket?.on('unreadCounts', ({ receiverId, unreadCount }) => {
        console.log("🚀 ~ socket?.on ~ receiverId:", receiverId)
        console.log(unreadCount, 'unread count')
        setUnreadCounts((prev) => ({
          ...prev,
          [receiverId]: unreadCount,
        }))
      })
      socket.on('read', ({ receiverId, unreadCount }) => {
        console.log('aayush ')
        setUnreadCounts((prev) => ({
          ...prev,
          [receiverId]: unreadCount,
        }))
      })
      return () => {
        socket.off('message')
        socket.off('typing')
        socket.off('read')
        socket?.off('unreadCounts')
      }
    }
  }, [socket, loggedInUserId, receiverId])

  useEffect(() => {
    // Handle status change
    if (socket) {
      socket.on('statusChange', ({ userId, active }) => {
        console.log("🚀 ~ socket.on ~ active:", active)
       console.log(
        users.map((user)=>(
          console.log(user.id,userId)
        ))
       )
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id === userId ? { ...user, active_status: active } : user
          )
        )
      })
      return () => {
        socket.off('statusChange')
      }
    }
  }, [socket])
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [chats])
  useEffect(() => {
    if (users.length > 0) {
      const firstUser = users[0]
      handleUserClick(firstUser, firstUser.id)
    }
  }, [users])
  const viewUsers = async () => {
    try {
      const response = await axiosInstance.get('/friend/friends')
      setUsers(response.data.data)
      response.data.data.map((friend: any) => fetchUnreadCounts(friend.id))
    } catch (error) {
      console.log(error)
    }
  }

  const fetchUnreadCounts = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/chat/counts/${id}`)
      setUnreadCounts(() => ({
        [id]: response.data.data,
      }))
      console.log(response, 'haha')
    } catch (error) {
      console.log('Error fetching unread count:', error)
    }
  }

  const settingCurrentUser = async () => {
    try {
      const response = await axiosInstance.get('/user/byToken')
      console.log(response.data.data, 'yoyo')
      setLoggedInUser(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const handleMessageSend = useCallback(async () => {
    if (message.trim() && receiverId && socket) {
      console.log(loggedInUser)
      const newChat: any = {
        receiverId,
        content: message,
      }
      socket.emit('sendMessage', newChat)
      console.log(newChat, 'yo chai new chat..')
      setMessage('')
    } else {
      console.log('Message or receiverId not found')
    }
  }, [message, receiverId, socket])

  const handleUserClick = async (user: User, userId: string) => {
    try {
      if (socket) {
        if (receiverId) {
          socket.emit('leaveRoom', { receiverId })
        }
        socket.emit('joinRoom', { receiverId: userId })
      }

      socket?.emit('readed', { receiverId: userId })
      console.log(userId)
      // console.log(loggedInUserId)
      const response = await axiosInstance.get(`/chat/${userId}`)

      setSelectedUser(user)
      setChats(response.data.data)
      setReceiverId(userId)
    } catch (error) {
      console.log('Error in handleUserClick:', error)
    }
  }
  const viewUser = async () => {
    try {
      const response = await axiosInstance.get('/friend/view-user')
      console.log(response.data.data, 'response all friends')
      setAddUsers(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }
  const addFriend = async (id: string) => {
    try {
      console.log(id, 'user id')
      const response = await axiosInstance.post(`/friend/${id}`)
      console.log(response.data, 'Request added')
      setAddUsers((prevRequests) => prevRequests.filter((request) => request.id !== id))
    } catch (error) {
      console.log(error)
    }
  }

  const addEmoji = (emoji: any) => {
    setMessage(message + emoji.native)
  }

  return (
    <div className='flex h-screen'>
      <button className='absolute top-8 left-4 md:hidden z-30' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? (
          <IoMdClose className='text-3xl text-red-500 mt-3' />
        ) : (
          <IoMdMenu className='text-3xl text-red-500' />
        )}
      </button>

      <div
        className={`absolute inset-0 md:w-[45vh] bg-gray-100 border-r border-gray-300 p-5 overflow-y-auto transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0 z-20' : '-translate-x-full'
        }`}
      >
        <h2 className='text-2xl font-bold mt-6 ml-16'>
          <Logo />
        </h2>
        {/* User list */}
        <div className='mt-10 border border-red-100 rounded-md max-h-[calc(3*6rem)] overflow-y-auto'>
          {users.map((user) => {
            const unreadCount = unreadCounts[user.id]
            return (
              <div
                key={user.id}
                onClick={() => handleUserClick(user, user.id)}
                className={`flex items-center p-6 cursor-pointer rounded-md border-b border-grey-500 ${
                  selectedUser?.id === user.id ? 'bg-red-100' : 'hover:bg-gray-200'
                }`}
              >
                {user.details.profileImage[0] && (
                  <img
                    src={`${user.details.profileImage[0].path}`}
                    alt={`Profile ${user.id}`}
                    className='w-10 h-10 object-cover rounded-full mr-3'
                  />
                )}
                <div className='flex-1'>
                  <p className='font-semibold'>
                    {user.details.first_name} {user.details.last_name}
                  </p>
                  <p className='text-sm text-red-600'>+{user.details.phone_number}</p>
                </div>
                <div></div>
                {unreadCount > 0 && (
                  <span className='bg-red-500 text-white rounded-full text-xs px-2 py-1'>{unreadCount}</span>
                )}
                {user.active_status && <span className='ml-2 text-green-500 text-xs'>Online</span>}
              </div>
            )
          })}
        </div>
        <div className='ml-14 mt-24 flex border border-red-200 rounded-lg bg-red-50 p-0 w-52 items-center justify-center'>
          <IoPersonAddSharp className='mr-1 text-lg text-red-400' />
          <p className='text-sm'>Add them to start a chat</p>
        </div>
        <div className='border border-red-100 rounded-md max-h-[calc(3*6rem)] overflow-y-auto'>
          {addUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserClick(user, user.id)}
              className={`flex items-center justify-between p-6 cursor-pointer rounded-md border-b border-grey-500 ${
                selectedUser?.id === user.id ? 'bg-red-100' : 'hover:bg-gray-200'
              }`}
            >
              <div className='flex items-center'>
                {user.details.profileImage[0] && (
                  <img
                    src={`${user.details.profileImage[0].path}`}
                    alt={`Profile ${user.id}`}
                    className='w-10 h-10 object-cover rounded-full mr-3'
                  />
                )}
                <div>
                  <p className='font-semibold'>
                    {user.details.first_name} {user.details.last_name}
                  </p>
                  <p className='text-sm text-red-600 '>+{user.details.phone_number}</p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => addFriend(user.id)}
                  className='inline-flex items-center px-6 py-2 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
                >
                  <IoIosPersonAdd className='text-xl mr-2' />
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Right Section: Messages */}
      <div className='flex-1 bg-white p-4 flex flex-col'>
        <div className='flex-1 overflow-y-auto'>
          {selectedUser ? (
            <div>
              <div className='sticky top-0 bg-white z-10 border-b border-grey-300 flex justify-center'>
                <IoChatboxEllipsesOutline className='mt-5 mr-3 text-3xl' />
                <h2 className='text-lg font-bold mb-10 mt-5'>Chatting with {selectedUser?.details.first_name}</h2>
              </div>
              <div className='space-y-4 flex flex-col'>
                {chats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg max-w-xs ${
                      chat.sender_id === loggedInUserId || chat.receiver_id === receiverId
                        ? 'bg-red-300 self-end mr-5'
                        : 'bg-green-50 self-start'
                    }`}
                  >
                    <div className='flex items-center'>
                      {chat.sender?.details?.profileImage?.map((image) => (
                        <img
                          key={image.id}
                          src={image.path}
                          alt={`Profile ${image.id}`}
                          className='w-10 h-10 object-cover rounded-full mr-3'
                        />
                      ))}
                      <p className='overflow-hidden text-ellipsis break-words'>{chat.content}</p>
                      <p></p>
                    </div>
                  </div>
                ))}
                {typing && (
                  <div className='p-3 rounded-lg max-w-xs self-start'>
                    <p>
                      <img src={chatsvg} alt='' className='w-10 h-10' />
                    </p>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-center h-full text-gray-500'>
              <p>Add users to start chatting</p>
            </div>
          )}
        </div>
        <div className='border-t border-gray-300 p-3 flex items-center relative'>
          <input
            type='text'
            value={message}
            onChange={handleChange}
            onKeyDown={() => socket?.emit('typing', { receiverId })}
            placeholder='Enter a message...'
            className='flex-1 p-2 mt-5 border rounded-lg focus:outline-none focus:border-red-500'
          />

          <button
            onClick={handleMessageSend}
            className='ml-2 mt-5 bg-red-500 text-white p-2 rounded-lg pl-5 pr-5 hover:bg-red-600'
          >
            Send
          </button>
          <div ref={emojiPickerRef}>
            <button
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className='ml-2 mt-5 bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300'
            >
              Emoji
            </button>
            {showEmojiPicker && (
              <div className='absolute bottom-12 right-0 z-10'>
                <Picker data={data} onEmojiSelect={addEmoji} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
