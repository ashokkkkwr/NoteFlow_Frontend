import React, { useCallback, useEffect, useRef, useState } from 'react';
import axiosInstance from 'services/instance';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { IoChatboxEllipsesOutline } from "react-icons/io5";

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
    id?: string;
    receiverId?: string;
    sender_id?: string;
    content?: string;
    sender: {
        details: {
            first_name: string;
            profileImage: Media[];
        };
    };
    receiver: {
        details: {
            first_name: string;
            profileImage: Media[];
        };
    };
}

interface Media {
    id: string;
    path: string;
}

const socket = io('http://localhost:5000', {
    auth: {
        token: sessionStorage.getItem('accessToken')
    }
});

export default function ChatOrganism() {
    const [users, setUsers] = useState<User[]>([]);
    const [chats, setChats] = useState<Chat[]>([]);
    const [receiverId, setReceiverId] = useState<string>('');
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [message, setMessage] = useState('');
    const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null);
    const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const chatEndRef = useRef<HTMLDivElement | null>(null);
    const emojiPickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            const decoded: any = jwtDecode(token);
            setLoggedInUserId(decoded.id);
        }
        viewUsers();
        settingCurrentUser();

    }, []);


    useEffect(() => {
        socket.on('message', (chat: Chat) => {
            console.log(chat, "received chat");
            setChats((prevChats) => [...prevChats, chat]);
        });
    
        return () => {
            socket.off('message');
        };
    }, []); // Make sure this dependency array is correct
    

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [chats]);

    useEffect(() => {
        if (users.length > 0) {
            const firstUser = users[0];
            handleUserClick(firstUser, firstUser.id);
        }
    }, [users]);

    const viewUsers = async () => {
        try {
            const response = await axiosInstance.get('/friend/friends');
            setUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const settingCurrentUser = async () => {
        try {
            const response = await axiosInstance.get('/user/byToken');
            console.log(response.data.data, 'yoyo');
            setLoggedInUser(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleUserClick = async (user: User, userId: string) => {
        const response = await axiosInstance.get(`/chat/${userId}`);
        setSelectedUser(user);
        setChats(response.data.data);
        setReceiverId(userId);
        console.log(userId, 'receiverId');

        // Emit joinRoom event
        socket.emit('joinRoom', { receiverId: userId });
    };


    const handleMessageSend = useCallback(async () => {
        if (message.trim() && receiverId) {
            console.log(loggedInUser);
            const newChat: any = {
                receiverId,
                content: message,  
            };
            socket.emit('sendMessage', newChat);
            console.log(newChat, "yo chai new chat..");
            setChats((prevChats) => [...prevChats, newChat]);
            setMessage('');
        } else {
            console.log("not found");
        }
    }, [message, receiverId]);

    const addEmoji = (emoji: any) => {
        setMessage(message + emoji.native);
    };
    return (
        <div className="flex h-screen">
            {/* Left Sidebar: User List */}
            <div className="w-1/5 bg-gray-100 border-r border-gray-300 p-5 overflow-y-auto">
                <h2 className="text-2xl font-bold  mt-6 ml-28 ">Chats</h2>
                {users.length === 0 && (
                    <p className='text-sm text-red-150'>Loading users...</p>
                )}
                <div className='mt-14'>
                    {users.map(user => (
                        <div
                            key={user.id}
                            onClick={() => handleUserClick(user, user.id)}
                            className={`flex items-center p-6 cursor-pointer rounded-md border-b border-grey-500 ${selectedUser?.id === user.id ? 'bg-red-100' : 'hover:bg-gray-200'
                                }`}
                        >
                            {user.details.profileImage[0] && (
                                <img
                                    src={`${user.details.profileImage[0].path}`}
                                    alt={`Profile ${user.id}`}
                                    className="w-10 h-10 object-cover rounded-full mr-3"
                                />
                            )}
                            <div>
                                <p className="font-semibold font-poppins">{user.details.first_name} {user.details.last_name}</p>
                                <p className="text-sm text-red-600 font-poppins">{user.email}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {/* Right Section: Messages */}
            <div className="flex-1 bg-white p-4 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    {selectedUser ? (
                        <div>
                            <div className="sticky top-0 bg-white z-10 border-b border-grey-300 flex  justify-center">
                                <IoChatboxEllipsesOutline className='mt-5 mr-3 text-3xl ' />

                                <h2 className="text-lg font-bold mb-10 mt-5 font-mono">Chatting with {selectedUser?.details.first_name}</h2>
                            </div>
                            {/* Message display area */}
                            <div className="space-y-4 flex flex-col">
                                {chats.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className={`p-3 rounded-lg max-w-xs ${chat.sender_id === loggedInUserId || chat.receiverId === receiverId
                                            ? 'bg-blue-200 self-end'
                                            : 'bg-gray-100 self-start'
                                            }`}
                                    >
                                        <div className="flex items-center">
                                            {chat.sender?.details?.profileImage?.map((image) => (
                                                <img
                                                    key={image.id}
                                                    src={image.path}
                                                    alt={`Profile ${image.id}`}
                                                    className="w-10 h-10 object-cover rounded-full mr-3"
                                                />
                                            ))}
                                            <p className="overflow-hidden text-ellipsis break-words">
                                                {chat.content}
                                            </p>
                                        </div>
                                    </div>
                                ))}

                                <div ref={chatEndRef} />  {/* This is the element to scroll into view */}
                            </div>
                        </div>
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                            <p>Select a user to start chatting</p>
                        </div>
                    )}
                </div>
                {/* Message input area */}
                <div className="border-t border-gray-300 p-3 flex items-center relative">
                    <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-2 mt-5 border rounded-lg focus:outline-none focus:border-red-500"
                    />
                    <button
                        onClick={handleMessageSend}
                        className="ml-2 mt-5 bg-red-500 text-white p-2 rounded-lg pl-5 pr-5 hover:bg-red-600"
                    >Send</button>
                    <div ref={emojiPickerRef}>
                        <button
                            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                            className='ml-2 mt-5 bg-gray-200 text-gray-700 p-2 rounded-lg hover:bg-gray-300'>
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
    );
}
