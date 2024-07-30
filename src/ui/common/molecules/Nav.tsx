import useLang from '@hooks/useLang'
import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import { MdMessage } from "react-icons/md"
import { IoIosNotifications } from "react-icons/io"
import { FaCaretDown } from 'react-icons/fa'
import axiosInstance from 'services/instance'
import { FaChevronDown } from "react-icons/fa";


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

export default function Nav() {
  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const { lang } = useLang()

  return (
    <div className="bg-white flex justify-between items-center p-4">
      <div className='flex'>
        <Link to='/auth/user/messages'>
          <div className="p-3 bg-gray-200 rounded-full">
            <MdMessage />
          </div>
        </Link>
        <Link to='/auth/user/notification'>
          <div className="p-3 ml-4 bg-gray-200 rounded-full">
            <IoIosNotifications />
          </div>
        </Link>
      </div>
      <div className='flex items-center relative' ref={dropdownRef}>
        <div className='ml-16 flex items-center cursor-pointer' onClick={() => setDropdownOpen(!dropdownOpen)}>
          {user?.details.profileImage.map(media => (
            <div key={media.id}>
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
            </div>
          </div>
          <FaChevronDown className="ml-2" />
        </div>
        {dropdownOpen && (
          <div className="absolute right-0 mt-12 w-48 bg-white rounded-md shadow-lg z-10">
            <ul>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">
                <Link to='/auth/user/signup'>
                  <p>{navbarLabel.signup[lang]} </p>
                </Link>
              </li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">
              <Link to ='/auth/user/login'>
    <p>{navbarLabel.login[lang]} </p>
    </Link>
              </li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">
                <Link to="/logout">Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
