import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';

interface Friends {
    id: string;
    createdAt: any;
    sender: {
        details: {
            first_name: string;
            last_name: string;
            profileImage: Media[];
        };
    };
}

interface Media {
    id: string;
    path: string;
}

export default function FriendRequests() {
    const [request, setRequest] = useState<Friends[]>([]);

    const friendRequest = async () => {
        try {
            const response = await axiosInstance.get('/friend');
            setRequest(response.data.data);
            console.log(response.data.data, "set Request");
        } catch (error) {
            console.error(error);
        }
    };

    const acceptRequest = async (id: string) => {
        try {
            const response = await axiosInstance.patch(`/friend/accept-request/${id}`);
            console.log(response.data, "Request Accepted");
            setRequest(prevRequests => prevRequests.filter(request => request.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        friendRequest();
    }, []);

    return (
        <div className='p-4 bg-white m-3 w-[113vh] max-w-screen-xl'>
            <div className='flex flex-wrap gap-28'>
                {request.map(friends => (
                    <div key={friends.id} className='flex flex-col items-center bg-gray-200 p-4 h- rounded-lg shadow-md w-1 md:w-1/3 lg:w-1/4'>
                        <div className='flex-shrink-0'>
                            {friends.sender.details.profileImage.map(media => (
                                <img
                                    key={media.id}
                                    src={`${media.path}`}
                                    alt={`Profile ${media.id}`}
                                    className='w-96 h-52 object-cover rounded-md '
                                />
                            ))}
                        </div>
                        <div className='flex flex-col items-center mt-4'>
                            <p className='text-xl font-semibold'>{friends.sender.details.first_name}</p>
                            <p className='text-xl'>{friends.sender.details.last_name}</p>
                        </div>
                        <div className='flex mt- gap-3'>
                            <button
                                onClick={() => acceptRequest(friends.id)}
                                className=' mt-4 w-[100px] h-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-lg hover:bg-red-500 hover:text-white transition-colors duration-300'
                            >
                                <p className='p-0 m-0 text-sm'>Accept</p>
                            </button>
                            <button
                                className="bg-red-500 text-white mt-4 w-[100px] h-10 border-2 border-red-500  py-2 px-4 rounded-md text-lg hover:bg-red-900 hover:text-white transition-colors duration-300"
                            >
                                <p className='p-0 m-0 text-sm'>Reject</p>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}