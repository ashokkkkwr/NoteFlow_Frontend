import React, { useState, useEffect, useCallback } from 'react'
import { io } from 'socket.io-client'
import axiosInstance from 'services/instance'

interface Message {
  receiverId: string
  content: string
}

const socket = io('http://localhost:5000', {
  auth: {
    token: sessionStorage.getItem('accessToken'),
  },
})

const Chat: React.FC = () => {
  const [message, setMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>([])
  const [receiverId, setReceiverId] = useState<string>('')

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axiosInstance.get('/chat')
        setMessages(response.data.data)
      } catch (error) {
        console.log(`Error fetching messages: ${error}`)
      }
    }

    fetchMessages()

    socket.on('receiveMessage', (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    })

    return () => {
      socket.off('receiveMessage')
    }
  }, [])

  const sendMessage = useCallback(async () => {
    if (message.trim() && receiverId) {
      const newMessage: Message = { receiverId, content: message }
      socket.emit('sendMessage', newMessage)
      setMessages((prevMessages) => [...prevMessages, newMessage])

      setMessage('')
    }
  }, [message, receiverId])

  return (
    <div>
      <h1>Chat App</h1>
      <div>
        <input
          type="text"
          value={receiverId}
          onChange={(e) => setReceiverId(e.target.value)}
          placeholder="Enter Receiver ID"
        />
      </div>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage}>Send</button>
      </div>
      <ul>
        {messages
          // .filter((msg) => msg.receiverId === receiverId)
          .map((msg, index) => (
            <li key={index}>
              <strong>{msg.receiverId}:</strong> {msg.content}
            </li>
          ))}
      </ul>
    </div>
  )
  
}

export default Chat
