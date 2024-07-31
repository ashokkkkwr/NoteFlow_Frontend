import React from 'react'
import useLang from '@hooks/useLang'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import ViewFriend from './ViewFriend'

export default function NavBarDown() {
    const {lang} = useLang()

  return (
    <>
   
    
    <div className='flex items-center space-x-2 mt-5 ml-6'>
  <span className="text-black text-2xl font-semibold">
    {navbarLabel.view[lang]}
  </span>
  <span className='text-black text-2xl font-semibold'>
    {navbarLabel.friends[lang]}
  </span>
  </div>
     
<ViewFriend />
        </>
  )
}
