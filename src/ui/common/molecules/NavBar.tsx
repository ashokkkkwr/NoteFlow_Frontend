import React from 'react'
import {Link} from 'react-router-dom'
import Button from '../atoms/Button'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import useLang from '@hooks/useLang'
export default function NavBar() {
        const {lang} = useLang()

  return (
    <div className=''>
        <div>
      <Link to ='/'>
    <Button type='button' buttonText={navbarLabel.home[lang]} />
    </Link>
    </div>
    <div>
    <Link to ='/auth/user/profile'>
    <Button type='button' buttonText={navbarLabel.profile[lang]} />
    </Link>

    </div>
    </div>
  )
}
