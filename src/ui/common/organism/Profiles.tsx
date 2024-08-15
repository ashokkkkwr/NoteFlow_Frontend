import useLang from '@hooks/useLang'
import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaEdit } from 'react-icons/fa'
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
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const { isSidebarOpen } = useSidebar()
  const [isFormOpen, setIsFormOpen] = useState(false) // State to track form visibility

  const viewUser = async () => {
    try {
      const response = await axiosInstance.get('/user/byToken')
      console.log(response.data.data, 'yoyo')
      setUser(response.data.data)
    } catch (error) {
      console.log(error, 'yo chai error')
    }
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any, id: string) => {
    e.preventDefault()
    const data = new FormData()
    data.append('email', formData.email)
    data.append('password', formData.password)
    try {
      const response = await axiosInstance.patch(`/user/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    viewUser()
  }, [])

  const { lang } = useLang()

  const toggleForm = () => {
    setIsFormOpen(!isFormOpen) 
  }

  return (
    <div
      className={`mt-2 bg-white cursor-pointer shadow-lg rounded-lg w-[50vh] h-[87vh] flex items-center justify-center ${
        isRightSidebarOpen ? 'hidden' : 'block'
      } ${isSidebarOpen ? 'hidden' : 'block'} 2xl:block 2xl:w-[119vh]`}
    >
      <div className='flex flex-col items-center'>
        {user?.details.profileImage.map((media) => (
          <div key={media.id} className='flex justify-center mt-1 2xl:mt-20'>
            <img src={`${media.path}`} alt={`Profile ${media.id}`} className='w-96 h-96 rounded-full object-cover' />
          </div>
        ))}

        <div className='ml mt-2'>
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
              <button className='flex items-center text-red-500 hover:text-red-700' onClick={toggleForm}>
                <FaEdit className='mr-2' />
                <span>Update</span>
              </button>
            </div>

            {/* Conditional Rendering of Form */}
            {isFormOpen && (
              <form onSubmit={(e) => handleSubmit(e, user?.id || '')} encType='multipart/form-data'>
                <div className='mt-16 ml-16'>
                  <input
                    className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
                    name='email'
                    type='email'
                    placeholder='Email'
                    onChange={handleChange}
                  />
                </div>
                <div className='mt-5 ml-16 flex'>
                  <input
                    className='h-14 w-[43vh] border-b-2 pr-10 pl-5 focus:outline-none'
                    name='password'
                    type='password'
                    placeholder='Password'
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <button className='bg-red-400 w-[43vh] h-14 rounded-xl ml-16 mt-10 hover:bg-red-500' type='submit'>
                    <p className='font-poppins text-white'>Update It</p>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
