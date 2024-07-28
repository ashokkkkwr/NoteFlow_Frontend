import React from 'react'
import Logo from '../molecules/Logo'
import NavBar from '../molecules/NavBar'

export default function LeftSidebar() {
  return (
    <div>
        <div className="w-64 h-screen bg-white p-4 ">
        <Logo />
        < NavBar />
        </div>
        left
    </div>
  )
}
