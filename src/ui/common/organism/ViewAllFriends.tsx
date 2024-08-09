import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axiosInstance from 'services/instance';
import { GrView } from "react-icons/gr";

interface User {
  id: string;
  createdAt: any;
  details: {
    first_name: string;
    last_name: string;
    profileImage: Media[];
    phone_number: string
  };
  email: string;
}

interface Media {
  id: string;
  path: string;
}

export default function ViewAllFriends() {

  const [users, setUsers] = useState<User[]>([]);

  const viewUsers = async () => {
    try {
      const response = await axiosInstance.get('/friend/friends');
      console.log(response.data.data, 'Friends');
      setUsers(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async (id: string) => {
    try {
        const response = await axiosInstance.delete(`/friend/unfriend/${id}`);
        console.log(response.data, "Request deleted");
        setUsers(prevRequests => prevRequests.filter(request => request.id !== id));
    } catch (error) {
        console.error(error);
    }
};

  useEffect(() => {
    viewUsers();
  }, []);


  return (

    <div className='p-4 bg-white m-3 w-[111vh] max-w-screen-xl'>
      <div className='flex flex-wrap gap-28'>
        {users.map(friends => (
          <div key={friends.id} className='flex flex-col items-center bg-gray-200 p-4 h- rounded-lg shadow-md w-1 md:w-1/3 lg:w-1/4'>
            <div className='flex-shrink-0'>
              {friends.details.profileImage.map(media => (
                <img
                  key={media.id}
                  src={`${media.path}`}
                  alt={`Profile ${media.id}`}
                  className='w-96 h-52 object-cover rounded-md '
                />
              ))}
            </div>

            <div className='flex flex-col items-center mt-4'>
              <p className='text-xl font-semibold'>{friends.details.first_name}</p>
              <p className='text-xl'>{friends.details.last_name}</p>
            </div>
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
            <div>
            <button
                                onClick={() => deleteUser(friends.id)}
                                className="bg-red-500 text-white mt-4 w-[100px] h-10 border-2 border-red-500  py-2 px-4 rounded-md text-lg hover:bg-red-900 hover:text-white transition-colors duration-300"
                            >
                                <p className='p-0 m-0 text-sm'>Reject</p>
                            </button>
            </div>

            <div className='flex mt- gap-3'>

            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
