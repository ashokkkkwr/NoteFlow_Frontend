import React from 'react'
import useLang from '@hooks/useLang'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import ViewFriend from './ViewFriend'

export default function NavBarDown() {
    const {lang} = useLang()

  return (
    <>
   
    
    <div className='flex items-center space-x-2 mt-5 ml-6'>
    <p className='ml- font-poppins text-red-700 text-base'>Check your pals</p>

  </div>
     
<ViewFriend />
        </>
  )
}
