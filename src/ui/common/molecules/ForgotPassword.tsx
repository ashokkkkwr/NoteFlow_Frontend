import React, { useState } from 'react'
import Logo from './Logo'
import axiosInstance from 'services/instance'
import axios from 'axios'
import VerifyOtp from './VerifyOtp'
export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    if (formData.email) data.append('email', formData.email)

    try {
      const response = await axiosInstance.post(`/auth/verify-email/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setSuccess(response.data.message)
      setIsSubmitted(true) // Set to true on successful submission

      console.log('🚀 ~ handleSubmit ~ response.data.message:', response.data.message)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message)
        setSuccess('')
      }
      console.log(error)
    }
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
    setError('')
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      {isSubmitted ? (
        <VerifyOtp email={formData.email} />      ) : (
        <div>
          <div className='flex '>
            <Logo />
          </div>
          <div>
            <p>
              Enter the email address associated with your account and we will send you a verification OPT to your
              email.
            </p>
          </div>
          <div>
            <p>Email</p>
          </div>
          <div>
            <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
              <div className='mt-16 ml-16'>
                <input
                  className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
                  value={formData.email}
                  name='email'
                  type='email'
                  placeholder='Enter an Email'
                  onChange={handleChange}
                />
                <div className='mt-5 ml-16'>
                  <button
                    className='text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                    type='submit'
                  >
                    Submit
                  </button>
                  {success && <p className='text-green-500 ml-16'>{success}</p>}
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
