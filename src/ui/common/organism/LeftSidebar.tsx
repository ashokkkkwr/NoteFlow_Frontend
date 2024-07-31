import React from 'react'
import Logo from '../molecules/Logo'
import NavBar from '../molecules/NavBar'
import NavBarDown from '../molecules/NavBarDown'

export default function LeftSidebar() {
  return (
    
      <div className='sticky top-0 z-10'>
      <div className="w-[40vh] h-[50vh] bg-white p-4 rounded-md shadow-md">

        <Logo />
       
        < NavBar />
      </div>
      <div className="mt-[10px] px w-[40vh] h-[447px] bg-white p-4 rounded-lg shadow-lg">
      <NavBarDown />
      </div>
        
        </div>
       
    
  )
}
