import { Link } from 'react-router-dom';
import { FaHome, FaUserFriends } from "react-icons/fa";
import { GiPlagueDoctorProfile } from "react-icons/gi";
import { IoSettings } from "react-icons/io5";
import { navbarLabel } from '@data/localization/common/landingPage/navbar';
import useLang from '@hooks/useLang';

export default function NavBar() {
  const { lang } = useLang();

  return (
    <div className=''>
      <div className='mt-14 ml-8'>
        <Link to='/'>
          <div className="flex items-center">
            <FaHome className="text-2xl" />
            <p className="mt-1 ml-2 text-lg"> {navbarLabel.home[lang]} </p>
          </div>
        </Link>
      </div>
      <div className='mt-8 ml-8'>
        <Link to='/auth/user/profile'>
          <div className="flex items-center">
            <GiPlagueDoctorProfile className="text-2xl" />
            <p className="mt-1 ml-2 text-lg"> {navbarLabel.profile[lang]}</p>
          </div>
        </Link>
      </div>
      <div className='mt-8 ml-8'>
        <Link to='/auth/user/friendRequests'>
          <div className="flex items-center">
            <FaUserFriends className="text-2xl" />
            <p className="mt-1 ml-2 text-lg"> {navbarLabel.friendRequest[lang]}</p>
          </div>
        </Link>
      </div>
      <div className='mt-8 ml-8'>
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
