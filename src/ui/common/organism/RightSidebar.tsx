import React from 'react'
import AddFriend from '../molecules/AddFriend'

export default function RightSidebar() {
  return (
    <div className='m-[10px] p-24 pb-36 bg-white sticky top-0 z-10'>
    <div className=''>
    <p className='font-poppins text-red-700 text-base'>People you may know</p>
    </div>  
  <div className=''>
    <AddFriend />
    </div>

    </div>
  )
}
