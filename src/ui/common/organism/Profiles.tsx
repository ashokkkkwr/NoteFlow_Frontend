import useLang from '@hooks/useLang'
import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaEdit } from 'react-icons/fa' // Import FaEdit
import axiosInstance from 'services/instance'
import { useRightSidebar } from '@context/RightSidebarContext'
import { useSidebar } from '@context/SidebarContext'
interface User {
  id: string
  createdAt: any
  details: {
    first_name: string
    last_name: string
    phone_number: string
    profileImage: Media[]
  }
  email: string
  role: string
}

interface Media {
  id: string
  path: string
}
export default function Profiles() {
  const [user, setUser] = useState<User | null>(null)
  const { isRightSidebarOpen } = useRightSidebar()
  const { isSidebarOpen } = useSidebar()

  const viewUser = async () => {
    try {
      const response = await axiosInstance.get('/user/byToken')
      console.log(response.data.data, 'yoyo')
      setUser(response.data.data)
    } catch (error) {
      console.log(error, 'yo chai error')
    }
  }

  useEffect(() => {
    viewUser()
  }, [])

  const { lang } = useLang()

  return (
    //w-[119vh]
    // <div className={`mt-10 bg-grey max-w-3xl ${isRightSidebarOpen?'hidden':'block'} ${isSidebarOpen?'hidden':'block'} 2xl:block  `}>
    <div
      className={`mt-2 bg-white cursor-pointer shadow-lg rounded-lg w-[50vh]  h-[87vh] flex items-center justify-center ${
        isRightSidebarOpen ? 'hidden' : 'block'
      } ${isSidebarOpen ? 'hidden' : 'block'} 2xl:block  2xl:w-[119vh]`}
    >
      <div className='flex flex-col items-center'>
        {user?.details.profileImage.map((media) => (
          <div key={media.id} className='flex justify-center mt-1 2xl:mt-20'>
            <img src={`${media.path}`} alt={`Profile ${media.id}`} className='w-96 h-96 rounded-full object-cover' />
          </div>
        ))}

        <div className=' ml mt-2'>
          <div className='ml-' key={user?.id}>
            <div className='flex mt-10'>
              <p className='text-4xl font-bold'>{user?.details.first_name}</p>
              <p className='ml-1 text-4xl font-bold'>{user?.details.last_name}</p>
            </div>
            <div className='flex mt-5 justify-center'>
              <p className='text-lg'>Email:</p>
              <p className='ml-5 text-lg'>{user?.email}</p>
            </div>
            <div className='flex mt-1 justify-center'>
              <p className='text-lg'>Phone:</p>
              <p className='ml-3 text-lg'>{user?.details.phone_number}</p>
            </div>
            <div className='flex mt-1 justify-center'>
              <p className='text-lg'>Role:</p>
              <p className='ml-7 text-lg'>{user?.role}</p>
            </div>

            {/* Update Button */}
            <div className='flex items-center mt-8 justify-center'>
              <button className='flex items-center text-red-500 hover:text-red-700'>
                <FaEdit className='mr-2' />
                <span>Update</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
