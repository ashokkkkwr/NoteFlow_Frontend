import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../atoms/Button'
import { FaHome, FaUserFriends } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";


import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import useLang from '@hooks/useLang'
export default function NavBar() {
  const { lang } = useLang()

  return (
    <div className=''>
      <div>
        <Link to='/'>
          <div className="flex items-center">
            <FaHome />
            <p className="mt-1 ml-1"> {navbarLabel.home[lang]} </p>
          </div>

        </Link>
      </div>
      <div>
        <Link to='/auth/user/profile'>
          <div className="flex items-center">
            <GiPlagueDoctorProfile />

            <p className="mt-1 ml-1"> {navbarLabel.profile[lang]}</p>
          </div>
        </Link>


      </div>
      <div>
        <Link to='/auth/user/friendRequests'>
          <div className="flex items-center">
            <FaUserFriends />

            <p className="mt-0 ml-1"> {navbarLabel.friendRequest[lang]}</p>
          </div>
        </Link>


      </div>
      <div>
        <Link to='/auth/user/friendRequests'>
          <div className="flex items-center">
            <IoSettings />
            <p className="mt-0 ml-1"> {navbarLabel.setting[lang]}</p>
          </div>
        </Link>


      </div>
    </div>
  )
}
