import useLang from '@hooks/useLang'
import React from 'react'
import {Link} from 'react-router-dom'
import Button from '../atoms/Button'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
export default function NavLists() {
    // const {lang} = useLang()
  return (
    <div>
            {/* <Link to ='/auth/user/signup'>
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
    </Link> */}
    </div>
  )
}
