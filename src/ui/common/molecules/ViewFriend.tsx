import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from 'services/instance';
import Default from '../../../assets/default.png'
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
    <div className='mt-10'>
      {users.slice(0, 3).map((friends) => (
        <div key={friends.id} className=" ml border-b border-gray-200 pb-3 mt-5" >
          <div className="flex">
            <div>
            {(friends?.details?.profileImage?.length ?? 0) > 0 ? (

              friends.details.profileImage.map((media) => (
                <div key={media.id}>
                  <img
                    src={media.path}
                    alt={`Profile ${media.id}`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                </div>
              ))):(
                <img
                    src={Default}
                    alt={`Profile`}
                    className="w-12 h-12 rounded-full object-cover"
                  />
              )}
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
      
     
      <button className="ml-6 mt-7 w-48 h-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-base hover:bg-red-500 hover:text-white transition-colors duration-300">
        View All
      </button>
      </Link>
    </div>
  );
}
