import axios from 'axios'
import React, { useState } from 'react'
import axiosInstance from 'services/instance'

export default function PasswordChange() {
  const [formData, setFormData] = useState({
    password: '',
    updatedPassword: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [success,setSuccess]=useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.updatedPassword !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    const data = new FormData()
    if (formData.password) data.append('password', formData.password)
    if (formData.updatedPassword) data.append('updatedPassword', formData.updatedPassword)

    try {
      const response = await axiosInstance.patch(`/auth/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      setSuccess(response.data.message)
      console.log("🚀 ~ handleSubmit ~ response.data.message:", response.data.message)

    } catch (error) {
        if(axios.isAxiosError(error)){
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
        <div className='mt-16 ml-16'>
          <input
            className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
            value={formData.password}
            name='password'
            type='password'
            placeholder='Current Password'
            onChange={handleChange}
          />
        </div>
        <div className='mt-5 ml-16'>
          <input
            className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
            value={formData.updatedPassword}
            name='updatedPassword'
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
