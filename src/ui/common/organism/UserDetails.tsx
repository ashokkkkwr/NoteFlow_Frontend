// UserDetails.tsx
import React, { useEffect, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axiosInstance from 'services/instance';
import { useRightSidebar } from '@context/RightSidebarContext';
import { useSidebar } from '@context/SidebarContext';
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
  role:string;
}

interface Media {
  id: string;
  path: string;
}

export default function UserDetails() {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const { isRightSidebarOpen } = useRightSidebar();
  const { isSidebarOpen } = useSidebar();
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log(id,"user ko id")
        const response = await axiosInstance.get(`/user/one/${id}`);
        console.log(response)
        setUser(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserDetails();
  }, [id]);

  if (!user) return <div>Loading...</div>;

  return (
    <div className={`mt-2 bg-white cursor-pointer shadow-lg rounded-lg w-[50vh]  h-[87vh] flex items-center justify-center ${isRightSidebarOpen?'hidden':'block'} ${isSidebarOpen?'hidden':'block'} 2xl:block  2xl:w-[119vh]`}>
  <div className="flex flex-col items-center">
  {user?.details.profileImage.map(media => (
          <div key={media.id} className='flex justify-center mt-1 2xl:mt-32'>
            <img
              src={`${media.path}`}
              alt={`Profile ${media.id}`}
              className="w-96 h-96 rounded-full object-cover"
            />
          </div>
        ))}

        <div className='ml mt-2'>
          <div className='ml-' key={user?.id}>
            <div className='flex mt-10'>
              <p className='text-4xl bold font-bold'>
                {user?.details.first_name}
              </p>
              <p className='ml-1 text-4xl bold font-bold'>
                {user?.details.last_name}
              </p>
            </div>
            <div className='flex mt-5'>
              <p className='text-lg'>Email:</p>
              <p className='ml-5 text-lg'>{user?.email}</p>
            </div>
            <div className='flex mt-1'>
              <p className='text-lg'>Phone:</p>
              <p className='ml-3 text-lg'>{user?.details.phone_number}</p>
            </div>
            <div className='flex mt-1'>
              <p className='text-lg'>Role:</p>
              <p className='ml-7 text-lg'>{user?.role}</p>
            </div>

           

          </div>
        </div>
      </div>
    </div>
  );
}
