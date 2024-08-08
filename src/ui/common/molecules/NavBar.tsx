import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserFriends } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { navbarLabel } from '@data/localization/common/landingPage/navbar';
import useLang from '@hooks/useLang';
import { FaUserEdit } from "react-icons/fa";

export default function NavBar() {
  const { lang } = useLang();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className=''>
      <div className={`mt-20 ml-8 ${isActive('/') ? 'border-l-4 border-red-500' : ''}`}>
        <Link to='/'>
          <div className="flex items-center">
            <FaHome className="text-2xl" />
            <p className="mt-1 ml-2 text-lg"> {navbarLabel.home[lang]} </p>
          </div>
        </Link>
      </div>
      <div className={`mt-10 ml-8 ${isActive('/auth/user/profile') ? 'border-l-4 border-red-500' : ''}`}>
        <Link to='/auth/user/profile'>
          <div className="flex items-center">
            <FaUserEdit className="text-2xl" />
            <p className="mt-1 ml-2 text-lg"> {navbarLabel.profile[lang]}</p>
          </div>
        </Link>
      </div>
      <div className={`mt-10 ml-8 ${isActive('/auth/user/friend-request') ? 'border-l-4 border-red-500' : ''}`}>
        <Link to='/auth/user/friend-request'>
          <div className="flex items-center">
            <FaUserFriends className="text-2xl" />
            <p className="mt-1 ml-2 text-lg">{navbarLabel.friendRequest[lang]}</p>
          </div>
        </Link>
      </div>
      <div className={`mt-10 ml-8 ${isActive('/auth/user/settings') ? 'border-l-4 border-red-500' : ''}`}>
        <Link to='/auth/user/settings'>
          <div className="flex items-center">
            <IoSettings className="text-2xl" />
            <p className="mt-1 ml-2 text-lg"> {navbarLabel.setting[lang]}</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
