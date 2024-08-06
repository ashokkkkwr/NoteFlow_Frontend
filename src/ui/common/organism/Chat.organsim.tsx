import React, { useCallback, useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';

interface User {
    id: string;
    createdAt: any;
    details: {
        first_name: string;
        last_name: string;
        profileImage: Media[];
        phone_number: string;
    };
    email: string;
}
interface Chat {
    id?: string
    receiverId?: string
    sender_id?: string
    content?: string
}

interface Media {
    id: string;
    path: string;
}
const socket = io('http://localhost:5000', {
    auth: {
        token: sessionStorage.getItem('accessToken')
    }
})

export default function ChatOrganism() {
    const [users, setUsers] = useState<User[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [chat, setChat] = useState<string>('');
    const [receiverId, setReceiverId] = useState<string>('')
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [message, setMessage] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);




    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            const decoded: any = jwtDecode(token);
            setLoggedInUserId(decoded.id);
            console.log(loggedInUserId)
        }
        viewUsers();
        socket.on('receiveMessage', (chat: Chat) => {
            setChats((prevChats) => [...prevChats, chat])
        })
        return () => {
            socket.off('receiveMessage')
        }
    }, []);

    const viewUsers = async () => {
        try {
            const response = await axiosInstance.get('/friend/friends');
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }

    };
    const handleUserClick = async (user: User, userId: string) => {
        const response = await axiosInstance.get(`/chat/${userId}`)
        console.log(response.data.data)
        console.log(loggedInUserId)
        setSelectedUser(user);
        setChats(response.data.data)
        setReceiverId(userId);
        console.log(userId, 'ue')
        // console.log(receiverId,"receiver")

    };

    const handleMessageSend = useCallback(async () => {
        console.log("button clicked")
        console.log(receiverId)
        console.log(message)
        if (message.trim() && receiverId) {
            const newChat = { receiverId, message }
            socket.emit('sendMessage', newChat)
            setChats((prevChats) => [...prevChats, newChat])
        } else {
            console.log("not found")
        }

    }, [message, receiverId])
    return (
        <div className="flex h-screen">
            {/* Left Sidebar: User List */}
            <div className="w-1/4 bg-gray-100 border-r border-gray-300 p-4 overflow-y-auto">
                <h2 className="text-lg font-bold mb-4">Users</h2>
                {users.map(user => (
                    <div
                        key={user.id}
                        onClick={() => handleUserClick(user, user.id)}
                        className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-md"
                    >
                        {user.details.profileImage[0] && (
                            <img
                                src={`${user.details.profileImage[0].path}`}
                                alt={`Profile ${user.id}`}
                                className="w-10 h-10 object-cover rounded-full mr-3"
                            />
                        )}
                        <div>
                            <p className="font-semibold">{user.details.first_name} {user.details.last_name}</p>
                            <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Right Section: Messages */}
            <div className="flex-1 bg-white p-4 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    {selectedUser ? (
                        <div>
                            <h2 className="text-lg font-bold mb-4">Chat with {selectedUser.details.first_name}</h2>
                            {/* Message display area */}
                            <div className="space-y-4 flex flex-col">

                                {chats.map(chat => (
                                    <div
                                        key={chat.id}
                                        className={`p-3 rounded-lg max-w-xs ${chat.sender_id === loggedInUserId ? 'bg-blue-200 self-end' : 'bg-gray-100 self-start'
                                            }`}
                                    >
                                        <p>{chat.content}</p>
                                    </div>
                                ))}
                                <div>
                                    {
                                        chats.filter((msg) => msg.receiverId === receiverId)
                                            .map((msg, index) => (
                                                <div key={index}>
                                                    {msg.content}
                                                </div>
                                            ))
                                    }
                                </div>

                            </div>
                        </div>

                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <p>Select a user to start chatting</p>
                        </div>
                    )}
                </div>

                {/* Message input area */}
                <div className="border-t border-gray-300 p-2 flex items-center">




                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border rounded-lg focus:outline-none focus:border-red-500"
                    />
                    <button
                        onClick={handleMessageSend}
                        className="ml-2 bg-red-500 text-white p-2 rounded-lg hover:bg-red-600"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}