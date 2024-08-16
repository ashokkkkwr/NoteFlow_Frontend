import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from 'services/instance'
import { GrView } from 'react-icons/gr'
import { useRightSidebar } from '@context/RightSidebarContext'
import { useSidebar } from '@context/SidebarContext'
import Default from '../../../assets/default.png'
interface User {
  id: string
  createdAt: any
  details: {
    first_name: string
    last_name: string
    profileImage: Media[]
    phone_number: string
  }
  email: string
}

interface Media {
  id: string
  path: string
}

export default function ViewAllFriends() {
  const { isRightSidebarOpen } = useRightSidebar()
  const { isSidebarOpen } = useSidebar()

  const [users, setUsers] = useState<User[]>([])

  const viewUsers = async () => {
    try {
      const response = await axiosInstance.get('/friend/friends')
      console.log(response.data.data, 'Friends')
      setUsers(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/friend/unfriend/${id}`)
      console.log(response.data, 'Request deleted')
      setUsers((prevRequests) => prevRequests.filter((request) => request.id !== id))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    viewUsers()
  }, [])

  return (
    <div className={`bg-white rounded-lg ${isRightSidebarOpen ? 'hidden' : 'block'} ${isSidebarOpen ? 'hidden' : 'block'} 2xl:block 2xl:w-[1115px] 2xl:ml-1 2xl:h-[812px] 2xl:mt-1`}>
      <div className='flex flex-wrap gap-x-12 ml-12 2xl:ml-20'>
        {users.map((friend) => (
          <div key={friend.id} className='bg-gray-200 p-20 mt-2 2xl:p-7 rounded-2xl '>
            <div className='flex-shrink-0'>
            {(friend?.details?.profileImage?.length ?? 0) > 0 ? (
            friend?.details.profileImage.map((media) => (
                <img
                  key={media.id}
                  src={`${media.path}`}
                  alt={`Profile ${media.id}`}
                  className='w-56 h-52 object-cover rounded-md'
                />
              ))):(
                <img
                  key={Default}
                  src={`${Default}`}
                  alt={`Profile ${Default}`}
                  className='w-56 h-52 object-cover rounded-md'
                />
              )}
            </div>
            <div className='flex flex-col items-center mt-4'>
              <p className='text-xl font-semibold'>{friend.details.first_name}</p>
              <p className='text-xl'>{friend.details.last_name}</p>
            </div>
            <div className='flex justify-between'>
              <Link to={`/auth/user/${friend.id}`} className='flex'>
                <button className='ml-2 mt-4 w-[100px] h-10 border-2 border-red-500 text-red-500 py-2 px-4 rounded-md text-lg hover:bg-red-500 hover:text-white transition-colors duration-300'>
                  <div className='flex'>
                    <GrView />
                    <p className='p-0 ml-2 text-sm'>View</p>
                  </div>
                </button>
              </Link>
              <button
                onClick={() => deleteUser(friend.id)}
                className='bg-red-500 text-white mt-4 w-[100px] h-10 border-2 border-red-500 py-2 px-4 rounded-md text-lg hover:bg-red-900 hover:text-white transition-colors duration-300'
              >
                <p className='p-0 m-0 text-sm'>Unfriend</p>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
