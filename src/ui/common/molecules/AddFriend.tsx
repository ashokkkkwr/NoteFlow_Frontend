import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import { IoIosPersonAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import { useSocket } from '@context/SocketContext';
import Default from '../../../assets/default.png'
import { TbFriends } from "react-icons/tb";

interface User {
  id: string;
  details: {
    first_name: string;
    last_name: string;
    profileImage: Media[];
    phone_number: string;
  };
}

interface RightSideBarProps {
  setTestId: (id: string | null, senderDetails: any, notiService: any) => void;
}
interface Media {
  id: string;
  path: string;
}

const AddFriend: React.FC<RightSideBarProps> = ({ setTestId }) => {
  const [users, setUsers] = useState<User[]>([]);
  const socket = useSocket();

  const viewUsers = async () => {
    try {
      const response = await axiosInstance.get('/friend/view-user');
      console.log(response.data.data, 'response all friends');
      setUsers(response.data.data.slice(0, 3));
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = async (receiverId: string) => {
    try {
      console.log(receiverId, 'user id');
      console.log(receiverId, "User is the request.");
      if (socket) {
        socket.emit('request', receiverId);
      }
      setUsers(prevRequests => prevRequests.filter(request => request.id !== receiverId));
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
      console.log('Socket connected from AddFriend:', socket.connected);

      socket.on('notiReceiver', ({ receiverId, senderDetails, notiService }) => {
        console.log(senderDetails, "hahahaha sent friend request...");
        console.log(receiverId, "Receiver ID received in real-time");
        console.log(notiService, "Notification in real-time");
        setTestId(receiverId, senderDetails, notiService);
      });

      return () => {
        socket.off('notiReceiver');
      };
    }
  }, [socket]);

  return (
    // <div className="mt-2 bg-white p-4 rounded-lg inline-flex flex-col min-w-max w-[45vh] h-[45vh] sm:w-[50vw]">

    <div className=' bg-white p-4 rounded-lg inline-flex flex-col  2xl:w-[45vh]' >
      <div className='flex items-center justify-center '>
        <p className='font-poppins text-red-700 text-base'>People you may know</p>
      </div>

      {users.map(user => (
        <div key={user.id} className='mt-1 flex items-start py-4 border-b border-gray-200'>
          <div className='flex items-start flex-1'>
          {(user?.details?.profileImage?.length ?? 0) > 0 ? (
            user?.details.profileImage.map((media) => (
              <img
                src={media.path}
                alt={Default}
                className='w-12 h-12 rounded-full object-cover'
              />
            )             
            )):(
              <img
                src={Default}
                alt={Default}
                className='w-12 h-12 rounded-full object-cover'
              />
            )
          }
            <div className='ml-3 flex-1'>
              <Link to={`/auth/user/${user.id}`}>
                <p className='text-lg truncate'>{user.details.first_name} {user.details.last_name}</p>
                <p className='text-sm text-red-500 truncate'>+{user.details.phone_number}</p>
              </Link>
            </div>
          </div>
          <div className='flex items-center'>
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
      <Link to={`/auth/user/viewAllUser`} className='flex justify-center items-center mt-4'>
        <button 
              className=' flex justify-center items-center w-40 h-12 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-full hover:from-red-500 hover:to-red-700 transition-colors duration-300 shadow-lg'
>
        View All
        </button>
      </Link>
    </div>
  );
};

export default AddFriend;
