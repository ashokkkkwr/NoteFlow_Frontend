import React from 'react'
import {Link} from 'react-router-dom'
import useLang from '@hooks/useLang'
import Button from '../atoms/Button'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
  const Navbar = () =>{
    const {lang} = useLang()
  
  return (
    <div>
    <Link to ='/auth/user'>
    <Button type='button' buttonText={navbarLabel.signup[lang]} />
    </Link>

    </div>
  )
}
export default Navbar
