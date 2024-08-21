import React, { useState, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { authLabel } from '@data/localization/common/auth'
import useLang from '@hooks/useLang'
import axiosInstance from 'services/instance'
import { navbarLabel } from '@data/localization/common/landingPage/navbar'
import axios from 'axios'
import img from '../../../assets/0d3e2652a240bb7daab25add7569e23d.jpg'
import img1 from '../../../assets/tree.jpg'
import { FaImage } from 'react-icons/fa'
import { MdPermMedia } from 'react-icons/md'
// Define a type for formData
interface FormData {
  email: string
  password: string
  firstName: string
  middleName: string
  lastName: string
  phoneNumber: string
  role: string
  files: FileList | null
}

const Signup: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const { lang } = useLang()
  const navigate = useNavigate()
  const goLogin = () => {
    navigate('/auth/user/login')
  }
  const goBack = () => {
    navigate('/')
  }

  // Initialize state with type FormData
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    phoneNumber: '',
    role: '',
    files: null,
  })
  const [imagePreviews, setImagePreviews] = useState<string[]>([])

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    setFormData((prevData) => ({
      ...prevData,
      files: e.target.files,
    }))
    setImagePreviews(files.map(URL.createObjectURL))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData()
    data.append('email', formData.email)
    data.append('password', formData.password)
    data.append('first_name', formData.firstName)
    data.append('middle_name', formData.middleName)
    data.append('last_name', formData.lastName)
    data.append('phone_number', formData.phoneNumber)
    data.append('role', formData.role)
    data.append('type', 'PROFILE')

    if (formData.files) {
      for (let i = 0; i < formData.files.length; i++) {
        data.append('files', formData.files[i])
      }
    }

    try {
      await axiosInstance.post('/user/signup', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      goLogin()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message)
      }
    }
  }

  return (
    <div className='flex bg-purple-300'>
      <div>
        <img src={img} alt='' className='h-screen bg-contain w-[71vh]' />
      </div>
      <div className='flex items-center justify-center h-screen bg-red-100'>
        <div className='bg-white w-[65vh] h-screen  shadow-2xl p-8'>
          <div className='ml-5'>
            <p className='text-3xl font-bold font-poppins mt-14 ml-8'>
              {authLabel?.userSignup?.[lang] || 'User Signup'}
            </p>
            <p className='ml-5 mt-5 w-[29vh] text-center font-poppins text-lg'>
              {authLabel?.enterYourDetails?.[lang] || 'Enter your details to sign up'}{' '}
              {/* Assuming there's a localization key for this */}
            </p>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className='mt-8 ml-8'>
                <input
                  className='h-11 w-[43vh] border-b-2 border-pink-500 font-poppins'
                  name={'email'}
                  type={'email'}
                  placeholder={authLabel?.enterYourEmail?.[lang] || 'Enter your email'}
                  onChange={handleChange}
                />
              </div>
              <div className='mt-5 ml-8'>
                <input
                  className='h-11 w-[43vh] border-b-2 border-pink-500'
                  name={'password'}
                  type={'password'}
                  placeholder={authLabel?.enterYourPassword?.[lang] || 'Enter your password'}
                  onChange={handleChange}
                />
              </div>
              <div className='mt-5 ml-8'>
                <input
                  className='h-11 w-[43vh] border-b-2 border-pink-500'
                  name={'role'}
                  type={'text'}
                  placeholder={authLabel?.enterYourRole?.[lang] || 'Enter your role'}
                  onChange={handleChange}
                />
              </div>
              <div className='mt-5 ml-8'>
                <input
                  className='h-11 w-[43vh] border-b-2 border-pink-500'
                  name={'firstName'}
                  type={'text'}
                  placeholder={authLabel?.enterYourFirstName?.[lang] || 'Enter your first name'}
                  onChange={handleChange}
                />
              </div>
              <div className='mt-5 ml-8'>
                <input
                  className='h-11 w-[43vh] border-b-2 border-pink-500'
                  name={'middleName'}
                  type={'text'}
                  placeholder={authLabel?.enterYourMiddleName?.[lang] || 'Enter your middle name'}
                  onChange={handleChange}
                />
              </div>
              <div className='mt-5 ml-8'>
                <input
                  className='h-11 w-[43vh] border-b-2 border-pink-500'
                  name={'lastName'}
                  type={'text'}
                  placeholder={authLabel?.enterYourLastName?.[lang] || 'Enter your last name'}
                  onChange={handleChange}
                />
              </div>
              <div className='mt-5 ml-8'>
                <input
                  className='h-11 w-[43vh] border-b-2 border-pink-500'
                  name={'phoneNumber'}
                  type={'text'}
                  placeholder={authLabel?.enterYourPhoneNumber?.[lang] || 'Enter your phone number'}
                  onChange={handleChange}
                />
              </div>
              <div className='mt-16 ml-8'>
                <label className='cursor-pointer flex items-center gap-1 text-red-500'>
                <MdPermMedia className='text-2xl' />

                  <input
                    className='h-11 w-[25vh] border-b-2 border-pink-500 hidden'
                    name={'files'}
                    type={'file'}
                    onChange={handleFileChange}
                  />
                  <span className='text-sm text-gray-600'>Media</span>
                </label>
              </div>
              <div className='flex gap-2 mt-2'>
                {imagePreviews.map((src, index) => (
                  <img key={index} src={src} alt='Selected' className='w-20 h-20 rounded-md object-cover' />
                ))}
              </div>
              <p className='mt-6 ml-20 font-poppins text-sm text-red-500'> {errorMessage}</p>

              <button
                className='ml-10 mt-10 w-96 h-10 border-2 border-black text-black py-2 px-4 rounded-xl text-base hover:bg-red-500 hover:text-white transition-colors duration-300'
                type={'submit'}
              >
                <p className='font-poppins '>{navbarLabel?.signup?.[lang] || 'Sign up'}</p>
              </button>
              <div className='flex mt-7 ml-10'>
                <p className='font-poppins'>{authLabel?.alreadyHaveAccount?.[lang] || 'Already have an account?'}</p>
                <Link to='/auth/user/login'>
                  <p className='ml-1 text-black-500 underline font-poppins font-semibold'>
                    {authLabel?.login?.[lang] || 'Login'}
                  </p>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div>
        <img src={img1} alt='' className='h-screen w-[71vh] bg-contain w' />
      </div>
    </div>
  )
}

export default Signup
