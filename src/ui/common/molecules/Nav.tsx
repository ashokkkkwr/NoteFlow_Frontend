import useLang from '@hooks/useLang';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Button from '../atoms/Button';
import { navbarLabel } from '@data/localization/common/landingPage/navbar';
import { MdMessage } from "react-icons/md";
import { IoIosNotifications } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import axiosInstance from 'services/instance';
import { useSocket } from '@context/SocketContext';

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

interface Notification {
  senderId: string;
  content: string;
  senderProfileImage?: string;
  senderFirstName?: string;
}
interface Props{
  testId:string | null
}

export default function Nav({testId}:Props) {

  const socket = useSocket();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notiDropDownOpen, setNotiDropDownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notiDropdownRef = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  const viewUser = async () => {
    try {
      const response = await axiosInstance.get('/user/byToken');
      setUser(response.data.data);
    } catch (error) {
      console.log(error, 'Error fetching user data');
    }
  };

  useEffect(() => {
    viewUser();
  }, []);

  useEffect(() => {
    if (socket) {
      console.log('Socket connected:', socket.connected); // Check if socket is connected

      socket.on('messageNotification', (notification) => {
        console.log('Received notification:', notification);
        setNotifications((prevNotifications) => [...prevNotifications, notification]);
      });

      return () => {
        socket.off('messageNotification');
      };
    }
  }, [socket]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const notiHandleClickOutside = (event: MouseEvent) => {
      if (notiDropdownRef.current && !notiDropdownRef.current.contains(event.target as Node)) {
        setNotiDropDownOpen(false);
      }
    };
    document.addEventListener('mousedown', notiHandleClickOutside);
    return () => {
      document.removeEventListener('mousedown', notiHandleClickOutside);
    };
  }, []);

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
          {notiDropDownOpen && (
            <div className="absolute right-24 top-[9vh] w-96 h-96 bg-white rounded-md shadow-2xl z-10 p-10 flex flex-col">
                <p>{testId}</p>
              {notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={index} className="flex items-center mb-4">
                    <img
                      src={notification.senderProfileImage || '/default-profile.png'}  // Fallback to a default image if senderProfileImage is not provided
                      alt="Profile"
                      className="w-10 h-10 rounded-full mr-4"
                    />
                    <div>
                      <p className="text-sm font-semibold">
                        {notification.senderFirstName || 'Unknown User'}
                      </p>
                      <p className="text-xs text-gray-600">
                        {notification.content}
                      </p>
                    
                    </div>
                  </div>
                ))
              ) : (
                <p>No notifications</p>
                
              )}
            </div>
          )}

        </div>
      </div>
      <div className='flex items-center relative' ref={dropdownRef}>
        {user ? (
          <div className='ml-16 flex items-center cursor-pointer' onClick={() => setDropdownOpen(!dropdownOpen)}>
            {user.details.profileImage.map(media => (
              <div key={media.id}>
                <img
                  src={`${media.path}`}
                  alt={`Profile ${media.id}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            ))}
            <div className='ml-2 mt-2'>
              <div key={user.id}>
                {user.details.first_name}
              </div>
            </div>
            <FaChevronDown className="ml-2" />
          </div>
        ) : (
          <Link to='/auth/user/login'>
            <p>{navbarLabel.login[lang]}</p>
          </Link>
        )}
        {dropdownOpen && user && (
          <div className="absolute right-0 left-14 mt-32 w-48 bg-white rounded-md shadow-2xl z-10">
            <ul>
              <li className="p-2 hover:bg-gray-200 cursor-pointer">
                <Link to="/auth/user/logout">Logout</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
