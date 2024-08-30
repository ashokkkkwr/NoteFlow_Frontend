import axios from 'axios'
import React, { useState } from 'react'
import axiosInstance from 'services/instance'
import ChangePasscode from './ChangePasscode'

export default function VerifyOtp({ email }: { email: string }) { // Receive email as a prop
    const [formData, setFormData] = useState({
        email: email,
        otp:''
      })
      console.log(email,'from otp page')
    const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const data = new FormData()
    if (formData.email) data.append('email', formData.email)
    if(formData.otp)data.append('otp',formData.otp)

    try {
      const response = await axiosInstance.post(`/auth/verify-otp/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setSuccess(response.data.message)
      setIsSubmitted(true)

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
    <div>
        {isSubmitted?(
            <ChangePasscode email={formData.email} />
        ):(
<div>
        <div>Verification Code</div>
        <div>We Have Sent the Verification Code to your email address.</div>
        <div><form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
              <div className='mt-16 ml-16'>
                <input
                  className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
                  value={formData.otp}
                  name='otp'
                  type='text'
                  placeholder='Enter an OTP'
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
                  {error && <p className='text-red-500 ml-16'>{error}</p>}
                </div>
              </div>
            </form></div>
      </div>
        )}
      
    </div>
  )
}
