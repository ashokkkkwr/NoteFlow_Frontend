import useLang from '@hooks/useLang'
import React, { useEffect, useState } from 'react'
import { FaChevronDown, FaEdit, FaTimes } from 'react-icons/fa'
import axiosInstance from 'services/instance'
import { useRightSidebar } from '@context/RightSidebarContext'
import { useSidebar } from '@context/SidebarContext'
import Default from '../../../assets/default.png'
import axios from 'axios'

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
    first_name: '',
    last_name: '',
    phone_number: '',
  })
  const [formImage, setFormImage] = useState<File | null>(null)
  const { isSidebarOpen } = useSidebar()
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isImageEdit, setIsImageEdit] = useState(false)

  const viewUser = async () => {
    try {
      const response = await axiosInstance.get('/user/byToken')
      setUser(response.data.data)
    } catch (error) {
      console.log(error, 'yo chai error')
    }
  }

  useEffect(() => {
    if (user) {
      setFormData({
        email: user.email || '',
        password: '',
        first_name: user.details.first_name || '',
        last_name: user.details.last_name || '',
        phone_number: user.details.phone_number || '',
      })
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormImage(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent, id: string) => {
    e.preventDefault()
    const data = new FormData()

    if (formData.email) data.append('email', formData.email)
    if (formData.password) data.append('password', formData.password)
    if (formData.first_name) data.append('first_name', formData.first_name)
    if (formData.last_name) data.append('last_name', formData.last_name)
    if (formData.phone_number) data.append('phone_number', formData.phone_number)

    try {
      const response = await axiosInstance.patch(`/user/update/${id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setIsFormOpen(false) // Hide form after successful update
      viewUser() // Refresh user details
    } catch (error) {
      console.log(error)
    }
  }

  const handleImageSubmit = async () => {
    const data = new FormData()

    data.append('type', 'PROFILE')
    if (formImage) {
      data.append('files', formImage)
    }
    try {
      const response = await axiosInstance.patch(`/user/update-media`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      setIsImageEdit(false)
      viewUser() // Refresh user details
      console.log(response)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message)
      }
    }
  }

  useEffect(() => {
    viewUser()
  }, [])

  const { lang } = useLang()
  const toggleForm = () => {
    setIsFormOpen(!isFormOpen)
  }

  // Toggle the image edit form
  const toggleImageEdit = () => {
    setIsImageEdit(!isImageEdit)
  }

  return (
    <div
      className={`mt-2 bg-white cursor-pointer shadow-lg rounded-lg w-[50vh] h-[87vh] flex items-center justify-center ${
        isRightSidebarOpen ? 'hidden' : 'block'
      } ${isSidebarOpen ? 'hidden' : 'block'} 2xl:block 2xl:w-[116vh] 2xl:h-[848px]`}
    >
      <div className='flex flex-col items-center'>
        {isFormOpen ? (
          <>
            <div className='relative mt-1 2xl:mt-20'>
              {(user?.details?.profileImage?.length ?? 0) > 0 ? (
                user?.details.profileImage.map((media) => (
                  <img
                    key={media.id}
                    src={media.path ? media.path : Default}
                    alt={`Profile ${media.id}`}
                    className='w-96 h-96 rounded-full object-cover'
                  />
                ))
              ) : (
                <img src={Default} alt='Default Profile' className='w-96 h-96 rounded-full object-cover' />
              )}
              <button
                className='absolute right-0 bottom-0 bg-gray-700 text-white p-2 rounded-full hover:bg-gray-600'
                onClick={toggleImageEdit}
              >
                <FaEdit />
              </button>
            </div>

            {isImageEdit && (
              <div className='mt-5'>
                <input
                  type='file'
                  accept='image/*'
                  onChange={handleImageChange}
                  className='border-b-2 pr-10 pl-5 focus:outline-none'
                />
                <button
                  type='button'
                  onClick={handleImageSubmit}
                  className='text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-4 ml-4'
                >
                  Upload Image
                </button>
              </div>
            )}

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
              </div>
            </div>
          </>
        ) : (
          <div className='w-full'>
            <div className='flex justify-end mr-10 mt-5'>
              <button onClick={toggleForm} className='text-red-500 hover:text-red-700'>
                <FaTimes size={24} />
              </button>
            </div>
            <div className='flex justify-center items-center '>
            <form onSubmit={(e) => handleSubmit(e, user?.id || '')} encType='multipart/form-data'>
              <div className='mt-16 ml-16'>
                <input
                  className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
                  value={formData.email}
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
              <div className='mt-5 ml-16 flex'>
                <input
                  className='h-14 w-[43vh] border-b-2 pr-10 pl-5 focus:outline-none'
                  value={formData.first_name}
                  name='first_name'
                  placeholder='First name'
                  onChange={handleChange}
                />
              </div>
              <div className='mt-5 ml-16 flex'>
                <input
                  className='h-14 w-[43vh] border-b-2 pr-10 pl-5 focus:outline-none'
                  value={formData.last_name}
                  name='last_name'
                  placeholder='Last name'
                  onChange={handleChange}
                />
              </div>
              <div className='mt-5 ml-16 flex'>
                <input
                  className='h-14 w-[43vh] border-b-2 pr-10 pl-5 focus:outline-none'
                  value={formData.phone_number}
                  name='phone_number'
                  placeholder='Phone'
                  onChange={handleChange}
                />
              </div>

              <div className='ml-16 mt-5  flex justify-center items-center'>
                <button
                  className='text-white bg-red-500 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                  type='submit'
                >
                  Submit
                </button>
              </div>
            </form></div>
          </div>
        )}
      </div>
    </div>
  )
}
