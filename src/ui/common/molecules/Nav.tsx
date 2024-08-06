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
import {io} from 'socket.io-client'
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
interface Notification{
  senderId:string;
  content:string;
  senderProfileImage?:string
}
const socket=io('http://localhost:5000',{
  auth:{
    token:sessionStorage.getItem('accessToken')
  }
})

export default function Nav() {
  const[notifications,setNotifications]=useState<Notification[]>([])

  const [user, setUser] = useState<User | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [notiDropDownOpen, setNotiDropDownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const notiDropdownRef = useRef<HTMLDivElement>(null)
  const { lang } = useLang()
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
  /**useEffect to profile dropdown */
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
   /**useEffect to notification dropdown */
  useEffect(() => {
    const notiHandleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setNotiDropDownOpen(false)
      }
    }
    document.addEventListener('mousedown', notiHandleClickOutside)
    return () => {
      document.removeEventListener('mousedown', notiHandleClickOutside)
    }
  }, [])
  /**use effect for message notification */
  useEffect(()=>{
    socket.on('messageNotification',(notification)=>{
      setNotifications((prevNotifications)=>[...prevNotifications,notification])
    })
    return()=>{
      socket.off('messageNotification')
    }
  },[])
  
  return (
    <div className="bg-white flex justify-between items-center p-4">
      <div className='flex'>
        <Link to='/auth/user/message'>
          <div className="p-3 bg-gray-200 rounded-full">
            <MdMessage />
          </div>
        </Link>
        <div className='flex items-center relative' ref={notiDropdownRef}>
          <div className='ml-8 flex items-center cursor-pointer bg-gray-200 rounded-full p-3' onClick={() => setNotiDropDownOpen(!notiDropDownOpen)}>
            <IoIosNotifications />
          </div>
        </div>
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
                <Link to='/auth/user/login'>
                  <p>{navbarLabel.login[lang]} </p>
                </Link>
              </li>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">
                <Link to="/auth/user/logout">Logout</Link>
              </li>
            </ul>
          </div>
        )}
           {notiDropDownOpen && (
          <div className="absolute right-24 top-[9vh] w-96 h-96 bg-white rounded-md shadow-2xl z-10 p-10 flex items-start">
            {
              notifications.map((notification,index)=>(
                <div key={index} className='notificaiton'>   
                    <p>{notification.senderProfileImage}</p>
                    <img 
                      src={notification.senderProfileImage}
                      alt="Sender"
                      className='w-10 h-10 object-cover rounded-full mr-3' />
                    <p>{notification.content}</p>
                </div>
              ))
            }
          </div>
        )}
      </div>
    </div>
  )
}