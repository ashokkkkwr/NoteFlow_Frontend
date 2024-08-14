import React from 'react';
import Logo from '../molecules/Logo';
import NavBar from '../molecules/NavBar';
import NavBarDown from '../molecules/NavBarDown';
import { useSidebar } from '@context/SidebarContext';
export default function LeftSidebar() {
  const { isSidebarOpen } = useSidebar();

  return (
    <div className={`sticky top-0 z-10 ${isSidebarOpen ? 'block' : 'hidden'} 2xl:block`}>
      <div className="w-[40vh] h-[50vh] bg-white p-4 rounded-md shadow-md">
        <Logo />
        <NavBar />
      </div>
      <div className="mt-[10px] w-[40vh] h-[447px] bg-white p-4 rounded-lg shadow-lg">
        <NavBarDown />
      </div>
    </div>
  );
}
