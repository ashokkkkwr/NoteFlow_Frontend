import React from 'react'
import {Link} from 'react-router-dom'
import useLang from '@hooks/useLang'
import Button from '../atoms/Button'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import LanguageToggle from '../molecules/LanguageToggle'
  const Navbar = () =>{
    const {lang} = useLang()
  
  return (
    <div>
    <Link to ='/auth/user/signup'>
    <Button type='button' buttonText={navbarLabel.signup[lang]} />
    </Link>

    <Link to ='/auth/user/login'>
    <Button type='button' buttonText={navbarLabel.login[lang]} />
    </Link>

<LanguageToggle />
    </div>
  )
}
export default Navbar
