import { authLabel } from '@data/localization/common/auth'
import useLang from '@hooks/useLang'
import Button from '@ui/common/atoms/Button'
import InputField from '@ui/common/atoms/InputField'
import { MdDangerous } from 'react-icons/md'

import { Link, useNavigate } from 'react-router-dom'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import { useState } from 'react'
import axiosInstance from 'services/instance'
import axios from 'axios'
import React from 'react'
import { GoDash } from 'react-icons/go'
import { FaGoogle } from 'react-icons/fa'
import { FaFacebook } from 'react-icons/fa'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai' // Import eye icons
import Image from '../../../assets/rotate.jpg'
import GoogleAuth from '../molecules/GoogleLogin.molecules'
const Login = () => {
  const { lang } = useLang()
  const navigate = useNavigate()
  const goBack = () => {
    navigate('/')
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data = new FormData()
    data.append('email', formData.email)
    data.append('password', formData.password)

    try {
      const response = await axiosInstance.post('/auth', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const accessToken = response?.data?.data?.tokens?.accessToken
      if (accessToken) {
        // Store the token in session storage
        sessionStorage.setItem('accessToken', accessToken)
        goBack()
        window.location.reload()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message)
      }
    }
  }

  return (
    <>
      <div className='flex ' style={{ backgroundColor: '#ECB2CA' }}>
        <div>
          <img src={Image} alt='' className='h-screen w-1000vh' />
        </div>
        <div className='flex items-center justify-center h-screen ' style={{ backgroundColor: '#ECB2CA' }}>
          <div className='flex flex-col  items-center justify-center bg-white w-[58vh] h-[85vh] rounded-3xl shadow-2xl'>
            <p className='text-3xl font-bold font-poppins mt- ml-'>User Login</p>
            <p className='mt-5 w-[29vh] text-center font-poppins text-lg'>
              Hey, Enter Your Details to get sign in to your account.
            </p>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className='mt-16 ml-'>
                <input
                  className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none '
                  name={'email'}
                  type={'email'}
                  placeholder={authLabel.enterYourEmail[lang]}
                  onChange={handleChange}
                />
              </div>
              <div className='mt-5 ml- flex relative'>
                <input
                  className='h-14 w-[43vh] border-b-2  pr-10 pl-5 focus:outline-none'
                  name={'password'}
                  type={showPassword ? 'text' : 'password'}
                  placeholder={authLabel.enterYourPassword[lang]}
                  onChange={handleChange}
                />

                <div className='mt-3 ml- absolute left-[38vh]'>
                  <button type='button' onClick={togglePassword} className=''>
                    {showPassword ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
                  </button>
                </div>
              </div>

              <p className='mt-6 ml- font-poppins text-sm text-red-500'>Having Trouble Sign in?</p>
              <div className='flex'>
                <p className='mt-6 ml- font-poppins text-sm text-red-500'>
                  {errorMessage && (
                    <p className='flex'>
                      {' '}
                      <MdDangerous className='mt-1' />
                      {errorMessage}
                    </p>
                  )}
                </p>
              </div>
              <div>
                <button className='bg-red-400 w-[43vh] h-14 rounded-xl ml- mt-10 hover:bg-red-500' type={'submit'}>
                  <p className='font-poppins text-white'>Sign in</p>
                </button>
              </div>
              </form>
              <p className='mt-8 ml- flex font-poppins'>
                <GoDash className='mt-1' /> or signin with
                <GoDash className='mt-1' />
              </p>
              <div className='flex flex-col justify-center items-center'>
                <button className='mt-4'>
                  <p className='flex text-xl font-bold font-poppins'>
                    <span className='mt-1'>
                      <GoogleAuth />
                    </span>{' '}
                    {/* <span className='ml-3'>Google</span> */}
                  </p>
                </button>
                <button className='mt-4 ml- border rounded-xl h-14 w-44 flex items-center justify-center'>
                  <p className='flex text-xl font-bold font-poppins'>
                    <span className='mt-1'>
                      <FaFacebook />
                    </span>{' '}
                    <span className='ml-'>Facebook</span>
                  </p>
                </button>
              </div>
              <div className='flex mt-10 ml'>
                <p className='font-poppins'>Don't Have An Account?</p>
                <Link to='/auth/user/signup'>
                  <p className='ml-1 font-poppins font-semibold'>Request Now</p>
                </Link>
              </div>
            
          </div>
        </div>
        <div className='h-screen bg-black'></div>
      </div>
    </>
  )
}

export default Login
