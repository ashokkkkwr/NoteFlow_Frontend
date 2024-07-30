import React from 'react'
import AddFriend from '../molecules/AddFriend'

export default function RightSidebar() {
  return (
    <div className='m-[10px] p-6  bg-white sticky top-0 z-10 rounded-md shadow-md'>
    <div className='ml-14 mt-1 flex flex-col items-start'>
        <p className='ml-20 font-poppins text-red-700 text-base'>People you may know</p>
        <AddFriend />
        
    </div>
</div>

  )
}
