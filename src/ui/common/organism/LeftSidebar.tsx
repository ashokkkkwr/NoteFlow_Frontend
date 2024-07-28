import React from 'react'
import Logo from '../molecules/Logo'
import NavBar from '../molecules/NavBar'

export default function LeftSidebar() {
  return (
    
      <div>
      <div className="w-80 h-96 bg-white p-4 ">

        <Logo />
       
        < NavBar />
        </div>
      <div className="mt-1 w-80 h-96 bg-white p-4 ">
        left
        </div>
        
        </div>
       
    
  )
}
