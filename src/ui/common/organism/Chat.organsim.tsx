import React, { useCallback, useEffect, useRef, useState } from 'react';
import axiosInstance from 'services/instance';
import { jwtDecode } from 'jwt-decode';
import { io } from 'socket.io-client';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { TiMessageTyping } from "react-icons/ti";
import { BsChatSquareTextFill } from "react-icons/bs";
import Logo from '@ui/common/molecules/Logo'
import { IoIosPersonAdd } from "react-icons/io";
import { IoPersonAddSharp } from "react-icons/io5";


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
    receiver_id?: string;
    sender_id?: string;
    content?: string;
    createdAt: any;

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
    const [addUsers, setAddUsers] = useState<User[]>([]);

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
        viewUser()

    }, []);
    useEffect(() => {
        socket.on('message', (chat: Chat) => {
            console.log(chat, "received chat");
            setChats((prevChats) => [...prevChats, chat]);
        });
        return () => {
            socket.off('message');
        };
    }, []);
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
        if (receiverId) {
            socket.emit('leaveRoom', { receiverId });
        }
        socket.emit('joinRoom', { receiverId: userId });
        const response = await axiosInstance.get(`/chat/${userId}`);


        setSelectedUser(user);
        setChats(response.data.data);
        console.log(response.data.data)
        setReceiverId(userId);
        console.log(userId, 'receiverId');

        // Emit joinRoom event
    };
    const viewUser = async () => {
        try {
            const response = await axiosInstance.get('/friend/view-user');
            console.log(response.data.data, 'response all friends');
            setAddUsers(response.data.data);
        } catch (error) {
            console.log(error);
        }
    };
    const addFriend = async (id: string) => {
        try {
            console.log(id, 'user id');
            const response = await axiosInstance.post(`/friend/${id}`);
            console.log(response.data, 'Request added');
            setAddUsers(prevRequests => prevRequests.filter(request => request.id !== id));
        } catch (error) {
            console.log(error);
        }
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
            <div className="w-[45vh] bg-gray-100 border-r border-gray-300 p-5 overflow-y-auto">
                <h2 className="text-2xl font-bold  mt-6 ml-16 "><Logo /></h2>
                <div className='ml-14 mt-16 flex border border-green-200 rounded-lg bg-green-50 p-0 w-52 items-center justify-center '>
                    <BsChatSquareTextFill className='mr-1 text-lg text-green-400 ' />
                    <p className='text-sm'>Start Chatting....</p>
                    
                </div>
                <div className=' border border-red-100 rounded-md max-h-[calc(3*6rem)] overflow-y-auto'>
                    
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
                                <p className="font-semibold font-">{user.details.first_name} {user.details.last_name}</p>
                                <p className="text-sm text-red-600 ">+{user.details.phone_number}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='ml-14 mt-24 flex border border-green-200 rounded-lg bg-green-50 p-0 w-52 items-center justify-center '>
                    <IoPersonAddSharp className='mr-1 text-lg text-green-400 ' />
                    <p className='text-sm'>Add them to start a chat </p>               </div>
                <div className='border border-red-100 rounded-md max-h-[calc(3*6rem)] overflow-y-auto'>
                    {addUsers.map(user => (
                        <div
                            key={user.id}
                            onClick={() => handleUserClick(user, user.id)}
                            className={`flex items-center justify-between p-6 cursor-pointer rounded-md border-b border-grey-500 ${selectedUser?.id === user.id ? 'bg-red-100' : 'hover:bg-gray-200'
                                }`}
                        >
                            <div className="flex items-center">
                                {user.details.profileImage[0] && (
                                    <img
                                        src={`${user.details.profileImage[0].path}`}
                                        alt={`Profile ${user.id}`}
                                        className="w-10 h-10 object-cover rounded-full mr-3"
                                    />
                                )}
                                <div>
                                    <p className="font-semibold">{user.details.first_name} {user.details.last_name}</p>
                                    <p className="text-sm text-red-600 ">+{user.details.phone_number}</p>
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
            <div className="flex-1 bg-white p-4 flex flex-col">
                <div className="flex-1 overflow-y-auto">
                    {selectedUser ? (
                        <div>
                            <div className="sticky top-0 bg-white z-10 border-b border-grey-300 flex  justify-center">
                                <IoChatboxEllipsesOutline className='mt-5 mr-3 text-3xl ' />

                                <h2 className="text-lg font-bold mb-10 mt-5 ">Chatting with {selectedUser?.details.first_name} </h2>
                            </div>
                            {/* Message display area */}
                            <div className="space-y-4 flex flex-col">
                                {chats.map((chat) => (
                                    <div
                                        key={chat.id}
                                        className={`p-3 rounded-lg max-w-xs ${chat.sender_id === loggedInUserId || chat.receiver_id === receiverId
                                            ? 'bg-red-300 self-end mr-5'
                                            : 'bg-green-50 self-start'
                                            }`}
                                    >
                                        <p></p>
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
                            <p>Add  users to start chatting</p>
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
