import React from 'react';
import Logo from '../molecules/Logo';
import NavBar from '../molecules/NavBar';
import NavBarDown from '../molecules/NavBarDown';
import { useSidebar } from '@context/SidebarContext';
import { FiMenu, FiX } from 'react-icons/fi'; // Importing icons
import useTheme from '@hooks/useTheme';
import { ThemeEnum } from '@type/global.types';

export default function LeftSidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar(); // Destructure toggleSidebar from useSidebar
  const {theme} = useTheme();
  return (
    <>
    <div className='flex-col'>
    {/* <div className={`sticky top-0 z-10 ${isSidebarOpen ? 'block' : 'hidden'} 2xl:block`}> */}
      <div className={` bg-white  rounded-md shadow-md  sticky top-[11vh] ml-2 `}>
       
        
        <button onClick={toggleSidebar} className="block 2xl:hidden mt-7 mr-10">
          {isSidebarOpen ? <FiX className='text-3xl  text-red-600' /> : <FiMenu size={24} />} {/* Toggler Icon */}
        </button>
        <NavBar />
      </div>
      <div className={`mt-[10px] ml-2 w-[500px] h-[447px]  p-4 rounded-lg shadow-lg sticky top-[51vh] 2xl:w-[35vh] 2xl:h-auto ${theme === ThemeEnum.dark? 'bg-gray-800':'bg-white'}`}>
        <NavBarDown />
      </div>
      </div>
    {/* </div> */}
    </>
  );
}
