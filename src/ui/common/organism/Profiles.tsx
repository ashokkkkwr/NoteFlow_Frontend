import useLang from '@hooks/useLang';
import React, { useEffect, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';
import axiosInstance from 'services/instance';
interface User {
  id: string,
  createdAt: any,
  details: {
    first_name: string,
    last_name: string,
    profileImage: Media[]
  },
  email: string
}

interface Media {
  id: string;
  path: string;
}

export default function Profiles() {
  const [user, setUser] = useState<User | null>(null)
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
    <div>
       <div className='ml-16  items-center cursor-pointer' >
          {user?.details.profileImage.map(media => (
            <div key={media.id}className='ml-10'>
              <img
                src={`${media.path}`}
                alt={`Profile ${media.id}`}
                className="w-10 h-10 rounded-full object-cover"
              />
            </div>
          ))}


          <div className='ml-2 mt-2'>
            <div key={user?.id}>
              {user?.details.first_name}
              {user?.details.last_name}
              {user?.email}

            </div>
          </div>
         
        </div>
    </div>
  )
}
