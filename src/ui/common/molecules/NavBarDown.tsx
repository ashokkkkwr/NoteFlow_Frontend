import React from 'react'
import useLang from '@hooks/useLang'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import ViewFriend from './ViewFriend'

export default function NavBarDown() {
    const {lang} = useLang()

  return (
    <>
   
    
    <div className='ml-10'>
    <p className='font-poppins text-red-700 text-base'>Check your pals</p>

  </div>
     <div className=''>
<ViewFriend />
</div>
        </>
  )
}
