import React from 'react'
import {Link} from 'react-router-dom'
import useLang from '@hooks/useLang'
import Button from '../atoms/Button'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import LanguageToggle from '../molecules/LanguageToggle'
import Logo from '../molecules/Logo'
  const Navbar = () =>{
    const {lang} = useLang()
  
  return (
    <div className='flex gap-4'>
    < Logo />
    <Link to ='/auth/user/signup'>
    <Button type='button' buttonText={navbarLabel.signup[lang]} />
    </Link>

    <Link to ='/auth/user/login'>
    <Button type='button' buttonText={navbarLabel.login[lang]} />
    </Link>

    <Link to ='/auth/user/friend-request'>
    <Button type='button' buttonText={navbarLabel.friendRequest[lang]} />
    </Link>
    <Link to ='/auth/user/add-friends'>
    <Button type='button' buttonText={navbarLabel.addFriend[lang]} />
    </Link>
    <Link to ='/auth/user/view-friends'>
    <Button type='button' buttonText={navbarLabel.viewFriends[lang]} />
    </Link>


<LanguageToggle />
    </div>
  )
}
export default Navbar
