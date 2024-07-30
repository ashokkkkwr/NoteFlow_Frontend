import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';

interface User {
  id: string;
  createdAt: any;
  details: {
    first_name: string;
    last_name: string;
    profileImage: Media[];
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
    <div>
      {users.slice(0, 3).map((friends) => (
        <div key={friends.id} className="mt-12 ml-6">
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

            <div className="flex mt-3 ml-2">
              <p className="mr-1 text-lg">{friends.details.first_name}</p>
              <p className="text-lg">{friends.details.last_name}</p>
            </div>
          </div>
        </div>
      ))}
      <button className="ml-6 mt-10 w-56 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-lg hover:bg-red-500 hover:text-white transition-colors duration-300">
        View All
      </button>
    </div>
  );
}
