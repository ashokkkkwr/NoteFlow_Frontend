import { authLabel } from '@data/localization/common/auth'
import useLang from '@hooks/useLang'
import { useState } from 'react'
import { MdDangerous } from 'react-icons/md'
import { GoDash } from 'react-icons/go'
import { FaGoogle, FaFacebook } from 'react-icons/fa'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from 'services/instance'
import axios from 'axios'
import GoogleAuth from '../molecules/GoogleLogin.molecules'
import Image from '../../../assets/rotate.jpg'

const Login = () => {
  const { lang } = useLang()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false) // Loading state

  const togglePassword = () => setShowPassword(!showPassword)

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setLoading(true) // Start loading
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
        sessionStorage.setItem('accessToken', accessToken)
        navigate('/')
        window.location.reload()
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message)
      }
    } finally {
      setLoading(false) // End loading
    }
  }

  return (
    <div className='flex' style={{ backgroundColor: '#ECB2CA' }}>
      <div>
        <img src={Image} alt='' className='h-screen w-1000vh' />
      </div>
      <div className='flex items-center justify-center h-screen' style={{ backgroundColor: '#ECB2CA' }}>
        <div className='flex flex-col items-center justify-center bg-white w-[58vh] h-[85vh] rounded-3xl shadow-2xl'>
          <p className='text-3xl font-bold font-poppins mt-'>User Login</p>
          <p className='mt-5 w-[29vh] text-center font-poppins text-lg'>
            Hey, Enter Your Details to sign in to your account.
          </p>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='mt-16'>
              <input
                className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
                name='email'
                type='email'
                placeholder={authLabel.enterYourEmail[lang]}
                onChange={handleChange}
              />
            </div>
            <div className='mt-5 flex relative'>
              <input
                className='h-14 w-[43vh] border-b-2 pr-10 pl-5 focus:outline-none'
                name='password'
                type={showPassword ? 'text' : 'password'}
                placeholder={authLabel.enterYourPassword[lang]}
                onChange={handleChange}
              />
              <div className='mt-3 absolute left-[38vh]'>
                <button type='button' onClick={togglePassword}>
                  {showPassword ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
                </button>
              </div>
            </div>

            {errorMessage && (
              <p className='mt-6 flex text-red-500 text-sm'>
                <MdDangerous className='mt-1' />
                {errorMessage}
              </p>
            )}

            <button
              className={`bg-red-400 w-[43vh] h-14 rounded-xl mt-10 hover:bg-red-500 flex items-center justify-center ${
                loading ? 'cursor-not-allowed' : ''
              }`}
              type='submit'
              disabled={loading}
            >
              {loading ? (
                <div className='flex items-center'>
                  <svg
                    className='animate-spin h-5 w-5 mr-3 text-white'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    ></circle>
                    <path
                      className='opacity-75'
                      fill='currentColor'
                      d='M4 12a8 8 0 018-8v8z'
                    ></path>
                  </svg>
                  Loading...
                </div>
              ) : (
                <p className='font-poppins text-white'>Sign in</p>
              )}
            </button>
          </form>

          <p className='mt-8 flex font-poppins'>
            <GoDash className='mt-1' /> or sign in with <GoDash className='mt-1' />
          </p>

          <div className='flex flex-col justify-center items-center'>
            <button className='mt-4'>
              <p className='flex text-xl font-bold font-poppins'>
                <span className='mt-1'>
                  <GoogleAuth />
                </span>
              </p>
            </button>
            <button className='mt-4 border rounded-xl h-14 w-44 flex items-center justify-center'>
              <p className='flex text-xl font-bold font-poppins'>
                <span className='mt-1'>
                  <FaFacebook />
                </span>{' '}
                <span className='ml-'>Facebook</span>
              </p>
            </button>
          </div>

          <div className='flex mt-10'>
            <p className='font-poppins'>Don't Have An Account?</p>
            <Link to='/auth/user/signup'>
              <p className='ml-1 font-poppins font-semibold'>Request Now</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
