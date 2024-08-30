import axios from 'axios'
import React, { useState } from 'react'
import axiosInstance from 'services/instance'
import { Link, useNavigate } from 'react-router-dom'

export default function ChangePasscode({email}:{email:string}) {
    const navigate = useNavigate()
    const goBack = () => {
      navigate('/')
    }
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    email:email
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const data = new FormData()
    if (formData.email) data.append('email', formData.email)

    if (formData.newPassword) data.append('newPassword', formData.newPassword)

    try {
      const response = await axiosInstance.post(`/auth/reset-password`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setSuccess(response.data.message)
      goBack()
      console.log('🚀 ~ handleSubmit ~ response.data.message:', response)
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
      <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data'>
       
        <div className='mt-5 ml-16'>
          <input
            className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
            value={formData.newPassword}
            name='newPassword'
            type='password'
            placeholder='New Password'
            onChange={handleChange}
          />
        </div>
        <div className='mt-5 ml-16'>
          <input
            className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
            value={formData.confirmPassword}
            name='confirmPassword'
            type='password'
            placeholder='Confirm New Password'
            onChange={handleChange}
          />
        </div>
        {error && <p className='text-red-500 ml-16'>{error}</p>}

        <div className='mt-5 ml-16'>
          <button
            className='text-white bg-orange-500 hover:bg-orange-700 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
            type='submit'
          >
            Submit
          </button>
          {success && <p className='text-green-500 ml-16'>{success}</p>}
        </div>
      </form>
    </div>
  )
}
