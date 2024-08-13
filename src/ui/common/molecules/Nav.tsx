import useLang from '@hooks/useLang';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
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

interface Noti {
  id: string;
  sender: {
    id: string;
    email: string;
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

interface Props {
  testId: string | null;
  senderDetails: any;
}

export default function Nav({ testId, senderDetails }: Props) {
  const socket = useSocket();
  const [user, setUser] = useState<User | null>(null);
  const [noti, setNoti] = useState<Noti[]>([]);
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

  const viewNotifications = async () => {
    try {
      console.log("haha")
      const response = await axiosInstance.get('/friend/notification');
      console.log(response, "Notifications fetched successfully.");

      setNoti(response.data.data);
      console.log(response, "Notifications fetched successfully.");
    } catch (error) {
      console.log(error, 'Error fetching notification data');
    }
  };

  useEffect(() => {
    viewUser();
    viewNotifications();
  }, []);

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

  // Calculate total notifications (from API and real-time socket data)
  const totalNotifications = noti.length + (senderDetails ? 1 : 0);

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
            {totalNotifications > 0 && (
              <div className="absolute top-0 right-0 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs">
                {totalNotifications}
              </div>
            )}
          </div>
          {notiDropDownOpen && (
            <div className="absolute right-24 top-[9vh] w-96 h-96 bg-white rounded-md shadow-2xl z-10 p-4 flex flex-col">
              <div className="overflow-y-auto h-full">
                {senderDetails && (
                  <div className='flex'>
                    {senderDetails.details.profileImage.map((media: any) => (
                      <div key={media.id}>
                        <img
                          src={media.path}
                          alt={`Profile ${media.id}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="ml-4">
                      <p>{senderDetails.details.first_name} {senderDetails.details.last_name}</p>
                      <p>Sent You a Friend Invitation.</p>
                    </div>
                  </div>
                )}
                {noti.map((notification) => (
                  <div key={notification.id} className='flex mt-4 bg-red-200 p-3 rounded-md'>
                            <Link to='/auth/user/friend-request'className='flex'>

                    {notification.sender.details.profileImage.map((media) => (
                      <div key={media.id}>
                        <img
                          src={media.path}
                          alt={`Profile ${media.id}`}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      </div>
                    ))}
                    <div className="ml-4">
                      <p>{notification.sender.details.first_name} {notification.sender.details.last_name}</p>
                      <p>Sent You a Friend Invitation.</p>
                    </div>
                    </Link>
                  </div>
                ))}
              </div>
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
                <p>{user.details.first_name}</p>
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
