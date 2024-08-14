import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import { IoIosPersonAdd } from "react-icons/io";
import { Link } from 'react-router-dom';
import { GrView } from 'react-icons/gr';
import { useRightSidebar } from '@context/RightSidebarContext'
import { useSidebar } from '@context/SidebarContext'
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

export default function ViewAllFriends() {
  const [users, setUsers] = useState<User[]>([]);
  const { isRightSidebarOpen } = useRightSidebar()
  const { isSidebarOpen } = useSidebar()
  const viewUsers = async () => {
    try {
      const response = await axiosInstance.get('/friend/view-user');
      console.log(response.data.data, 'response all friends');
      setUsers(response.data.data);
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

    <div className={`bg-white rounded-lg ${isRightSidebarOpen ? 'hidden' : 'block'} ${isSidebarOpen ? 'hidden' : 'block'} 2xl:block 2xl:w-[1115px] 2xl:ml-1 2xl:h-[812px] 2xl:mt-1`}>
      <div className='flex flex-wrap gap-x-12 ml-12 2xl:ml-20'>
      {users.map(friends => (
          <div key={friends.id} className='bg-gray-200 p-20 mt-2 2xl:p-7 rounded-2xl '>
            <div className='flex-shrink-0'>
              {friends.details.profileImage.map(media => (
                <img
                  key={media.id}
                  src={`${media.path}`}
                  alt={`Profile ${media.id}`}
                  className='w-56 h-52 object-cover rounded-md '
                />
              ))}
            </div>

            <div className='flex flex-col items-center mt-4'>
              <p className='text-xl font-semibold'>{friends.details.first_name}</p>
              <p className='text-xl'>{friends.details.last_name}</p>
            </div>
            <div className='flex'>
            <Link to={`/auth/user/${friends.id}`} className='flex'>

              <button
                className='ml-2 mt-4 w-[100px] h-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-lg hover:bg-red-500 hover:text-white transition-colors duration-300'
              >
                <div className='flex'>
                  <GrView />

                  <p className='p-0 ml-2 text-sm'>View</p>
                </div>
                
              </button>
            </Link>
            <div className=''>
            <button
              onClick={() => addFriend(friends.id)}
              className='ml-2 mt-4 inline-flex items-center px-6 py-2 border-2 border-red-500 text-red-500 font-medium text-xs leading-tight uppercase rounded hover:bg-red-500 hover:text-white focus:outline-none focus:ring-0 transition duration-150 ease-in-out'
            >
              <IoIosPersonAdd className='text-xl mr-2' /> {/* Margin-right for spacing between icon and text */}
              Add
            </button>
          </div>
          </div>
            <div className='flex mt- gap-3'>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
