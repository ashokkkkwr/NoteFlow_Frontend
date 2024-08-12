import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import { IoIosPersonAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSocket } from '@context/SocketContext';

interface User {
  id: string;
  details: {
    first_name: string;
    last_name: string;
    profileImage: Media[];
    phone_number: string;
  };
}

interface Media {
  id: string;
  path: string;
}

export default function AddFriend() {
  const [users, setUsers] = useState<User[]>([]);
  const socket = useSocket();
  const [testId, setTestId] = useState(null);
  const [receiverId, setReceiverId] = useState('');

  const viewUsers = async () => {
    try {
      const response = await axiosInstance.get('/friend/view-user');
      console.log(response.data.data, 'response all friends');
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = async (id: string, receiverId: string) => {
    try {
      setReceiverId(receiverId);
      console.log(id, 'user id');
      console.log(receiverId, "User is the request.");
      const response = await axiosInstance.post(`/friend/${id}`);
      if (socket) {
        socket.emit('request', receiverId);
      }
      console.log(response.data, 'Request added');
      setUsers(prevRequests => prevRequests.filter(request => request.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewUsers();
  }, []);

  // Client-side socket event handling
  useEffect(() => {
    if (socket) {
      console.log('Socket connected from AddFriend:', socket.connected); // Check if socket is connected

      socket.on('notiReceiver', ({ receiverId }) => {
        console.log(receiverId, "Receiver ID received in real-time");
        setTestId(receiverId);
      });
      return () => {
        socket.off('notiReceiver');
      };
    }
  }, [socket]);

  return (
    <div className='mt-5'>
      <p>test:{testId}</p>
      {users.map(user => (
        <div key={user.id} className='mt-1 flex items-center justify-between p-4 border-b border-gray-200'>
          <div className='flex items-center'>
            {user.details.profileImage.length > 0 && (
              <img
                src={user.details.profileImage[0].path}
                alt={`Profile ${user.details.profileImage[0].id}`}
                className='w-12 h-12 rounded-full object-cover'
              />
            )}
            <div className='ml-3 w-48'>
              <Link to={`/auth/user/${user.id}`} className=''>
                <p className='text-lg truncate'>{user.details.first_name} {user.details.last_name}</p>
                <p className='text-sm text-red-500 truncate'>+{user.details.phone_number}</p>
              </Link>
            </div>
          </div>
          <div className='ml-28'>
            <button
              onClick={() => addFriend(user.id, user.id)}
              className='inline-flex items-center px-6 py-2 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
            >
              <IoIosPersonAdd className='text-xl mr-2' />
              Add
            </button>
          </div>
        </div>
      ))}
      <Link to={`/auth/user/viewAllUser`}>
        <button className="ml-6 mt-6 w-48 h-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-base hover:bg-red-500 hover:text-white transition-colors duration-300">
          See All
        </button>
      </Link>
    </div>
  );
}
