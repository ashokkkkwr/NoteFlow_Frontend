import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import { useSocket } from '@context/SocketContext';
import { useRightSidebar } from '@context/RightSidebarContext';
import { useSidebar } from '@context/SidebarContext';

interface Friends {
  id: string;
  createdAt: any;
  receiver_id: string;
  sender_id: string;
  sender: {
    details: {
      first_name: string;
      last_name: string;
      profileImage: Media[];
    };
  };
  receiver: {
    id: string;
    details: {};
  };
}

interface Media {
  id: string;
  path: string;
}

export default function FriendRequests() {
  const socket = useSocket();
  const [request, setRequest] = useState<Friends[]>([]);
  const [viewRequest,setViewRequest] =useState<Friends[]>([]);

  const { isRightSidebarOpen } = useRightSidebar();
  const { isSidebarOpen } = useSidebar();

  const friendRequest = async () => {
    try {
      const response = await axiosInstance.get('/friend');
      setRequest(response.data.data);
      console.log(response.data.data, 'set Request');
    } catch (error) {
      console.error(error);
    }
  };

  const acceptRequest = async (id: string, senderId: string) => {
    try {
      const response = await axiosInstance.patch(`/friend/accept-request/${id}`);
      console.log(response.data, 'Request Accepted');
      setRequest((prevRequests) => prevRequests.filter((request) => request.id !== id));
      if (socket) {
        socket.emit('accepted', { id, senderId });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const rejectRequest = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/friend/${id}`);
      console.log(response.data, 'Request deleted');
      setRequest((prevRequests) => prevRequests.filter((request) => request.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const viewRequests = async () => {
    try {
      const response = await axiosInstance.get('/friend/friends/requests')
      console.log(response.data.data, 'requests')
      console.log("🚀 ~ viewRequests ~ response.data.data:", response.data.data)

      setViewRequest(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    friendRequest();
    viewRequests()

  }, []);

  return (
    <div className={`bg-white rounded-lg ${isRightSidebarOpen ? 'hidden' : 'block'} ${isSidebarOpen ? 'hidden' : 'block'} 2xl:block 2xl:w-[116vh] 2xl:ml-1 2xl:h-[848px] 2xl:mt-2`}>
      <div className={`flex flex-wrap gap-x-12 ml-12 2xl:ml-20 `}>
        {request.length === 0 ? (
          <div className="flex items-center justify-center w-full h-full mt-96">
            <p className="text-center font-poppins text-gray-500 text-xl">No friend requests available</p>
          </div>
        ) : (
          request.map((friends) => (
            <div key={friends.id} className="bg-gray-200 p-20 mt-2 2xl:p-7 rounded-2xl">
              <div className="flex-shrink-0">
                {friends.sender.details.profileImage.map((media) => (
                  <img
                    key={media.id}
                    src={`${media.path}`}
                    alt={`Profile ${media.id}`}
                    className="w-56 h-52 object-cover rounded-md"
                  />
                ))}
              </div>
              <div className="flex flex-col items-center mt-4">
                <p className="text-xl font-semibold">{friends.sender.details.first_name}</p>
                <p className="text-xl">{friends.sender.details.last_name}</p>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => {
                    if (friends.receiver_id) {
                      acceptRequest(friends.id, friends.sender_id);
                    } else {
                      console.error('Receiver or receiver ID is undefined');
                    }
                  }}
                  className="mt-4 w-[100px] h-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-lg hover:bg-red-500 hover:text-white transition-colors duration-300"
                >
                  <p className="p-0 m-0 text-sm">Accept</p>
                </button>
                <button
                  onClick={() => rejectRequest(friends.id)}
                  className="bg-red-500 text-white mt-4 w-[100px] h-10 border-2 border-red-500 py-2 px-4 rounded-md text-lg hover:bg-red-900 hover:text-white transition-colors duration-300"
                >
                  <p className="p-0 m-0 text-sm">Reject</p>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
