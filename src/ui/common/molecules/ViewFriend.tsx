import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from 'services/instance';

interface User {
  id: string;
  createdAt: any;
  details: {
    first_name: string;
    last_name: string;
    profileImage: Media[];
    phone_number:string
  };
  email: string;
}

interface Media {
  id: string;
  path: string;
}

export default function ViewFriend() {
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
  


  useEffect(() => {
    viewUsers();
  }, []);


  return (
    <div className='mt-14'>
      {users.slice(0, 3).map((friends) => (
        <div key={friends.id} className="mt-3 ml-6 border-b border-gray-200 pb-5" >
          <div className="flex">
            <div>
              {friends.details.profileImage.map((media) => (
                <div key={media.id}>
                  <img
                    src={media.path}
                    alt={`Profile ${media.id}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
              ))}
            </div>
              <div className=''>
            <div className="flex mt- ml-2">
            {/* <p onClick={()=>viewUsersDetails(friends.id)}>{friends.id}</p> */}
            <Link to={`/auth/user/${friends.id}`} className='flex'>
              <p  className="mr-1 text-lg">{friends.details.first_name}</p>
              <p className="text-lg">{friends.details.last_name}</p>
              </Link>
            </div>
            <div className='ml-2'>
            <p className='text-sm text-red-500'>+ {friends.details.phone_number}</p>
            </div>
            </div>
           
            {/* <p>{friends.details.phone_number}</p> */}
          </div>
        
        </div>
      ))}
      <Link to={`/auth/user/viewAllFriends`}>
      
     
      <button className="ml-9 mt-10 w-56 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-lg hover:bg-red-500 hover:text-white transition-colors duration-300">
        View All
      </button>
      </Link>
    </div>
  );
}
