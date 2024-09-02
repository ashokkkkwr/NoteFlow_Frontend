import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUserFriends, FaUserEdit } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import useLang from '@hooks/useLang';
import { navbarLabel } from '@data/localization/common/landingPage/navbar';

export default function NavBar() {
  const { lang } = useLang();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex flex-col items- justify- py-7 px-2 bg-white rounded-lg">
      <p className="font-poppins text-red-700 text-base mb-7 ml-4">Browse through
      </p>
      
      <div className={`w-full mb-5 ${isActive('/') ? 'border-l-4 border-red-500 bg-gray-100' : 'hover:bg-gray-100'} transition-all duration-300 ease-in-out`}>
        <Link to="/">
          <div className="flex items-center p-3">
            <FaHome className="text-2xl text-black" />
            <p className="ml-4 text-lg text-black font-medium">{navbarLabel.home[lang]}</p>
          </div>
        </Link>
      </div>

      <div className={`w-full mb-5 ${isActive('/auth/user/profile') ? 'border-l-4 border-red-500 bg-gray-100' : 'hover:bg-gray-100'} transition-all duration-300 ease-in-out`}>
        <Link to="/auth/user/profile">
          <div className="flex items-center p-3">
            <FaUserEdit className="text-2xl text-black" />
            <p className="ml-4 text-lg text-black font-medium">{navbarLabel.profile[lang]}</p>
          </div>
        </Link>
      </div>

      <div className={`w-full mb-5 ${isActive('/auth/user/friend-request') ? 'border-l-4 border-red-500 bg-gray-100' : 'hover:bg-gray-100'} transition-all duration-300 ease-in-out`}>
        <Link to="/auth/user/friend-request">
          <div className="flex items-center p-3">
            <FaUserFriends className="text-2xl text-black" />
            <p className="ml-4 text-lg text-black font-medium">{navbarLabel.friendRequest[lang]}</p>
          </div>
        </Link>
      </div>

      <div className={`w-full mb- ${isActive('/auth/user/settings') ? 'border-l-4 border-red-500 bg-gray-100' : 'hover:bg-gray-100'} transition-all duration-300 ease-in-out`}>
        <Link to="/auth/user/settings">
          <div className="flex items-center p-3">
            <IoSettings className="text-2xl text-black" />
            <p className="ml-4 text-lg text-black font-medium">{navbarLabel.setting[lang]}</p>
          </div>
        </Link>
      </div>
      {/* <div className={`w-full mb- ${isActive('/auth/user/aboutUs') ? 'border-l-4 border-red-500 bg-gray-100' : 'hover:bg-gray-100'} transition-all duration-300 ease-in-out`}>
        <Link to="/auth/user/aboutUs">
          <div className="flex items-center p-3">
            <IoSettings className="text-2xl text-black" />
            <p className="ml-4 text-lg text-black font-medium">{navbarLabel.aboutUs[lang]}</p>
          </div>
        </Link>
      </div> */}
    </div>
  );
}
