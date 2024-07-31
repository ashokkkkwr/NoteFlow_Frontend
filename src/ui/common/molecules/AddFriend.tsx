import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import { IoIosPersonAdd } from "react-icons/io";

interface User {
  id: string;
  details: {
    first_name: string;
    last_name: string;
    profileImage: Media[];
    phone_number:string;
  };
}

interface Media {
  id: string;
  path: string;
}

export default function AddFriend() {
  const [users, setUsers] = useState<User[]>([]);

  const viewUsers = async () => {
    try {
      const response = await axiosInstance.get('/friend/view-user');
      console.log(response.data.data, 'response all friends');
      setUsers(response.data.data.slice(0, 3)); // Fetch only 3 data
    } catch (error) {
      console.log(error);
    }
  };

  const addFriend = async (id: string) => {
    try {
      console.log(id, 'user id');
      const response = await axiosInstance.post(`/friend/${id}`);
      console.log(response.data, 'Request added');
      setUsers(prevRequests => prevRequests.filter(request => request.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    viewUsers();
  }, []);

  return (
    <div className='mt-5'>
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
            <div className='ml-3'>
              <p className='text-lg'>{user.details.first_name} {user.details.last_name}</p>
              <p className='text-sm text-red-500'>+{user.details.phone_number}</p>
            </div>
            <div className='ml-1'>
             
            </div>
          </div>
          <div className='ml-32'>
            <button
              onClick={() => addFriend(user.id)}
              className='inline-flex items-center px-6 py-2 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
            >
              <IoIosPersonAdd className='text-xl mr-2' /> {/* Margin-right for spacing between icon and text */}
              Add
            </button>
          </div>
        </div>
      ))}
      <button className="ml-6 mt-6 w-48 h-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-base hover:bg-red-500 hover:text-white transition-colors duration-300">
      See All
      </button>
    </div>
  );
}
