import axios from 'axios';
import React, { useState } from 'react';
import axiosInstance from 'services/instance';

export default function PasswordChange() {
  const [formData, setFormData] = useState({
    password: '',
    updatedPassword: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.updatedPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const data = new FormData();
    if (formData.password) data.append('password', formData.password);
    if (formData.updatedPassword) data.append('updatedPassword', formData.updatedPassword);

    try {
      const response = await axiosInstance.patch(`/auth/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccess(response.data.message);
      console.log("🚀 ~ handleSubmit ~ response.data.message:", response.data.message);

    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
        setSuccess('');
      }
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setError('');
  };

  return (
    <div className='flex flex-col justify-center items-center p-10 pb-20'>
      <form onSubmit={(e) => handleSubmit(e)} encType='multipart/form-data' className='w-[40vh]'>
        <div className='mb-5'>
          <input
            className='h-12 w-full border-2 border-red-300 rounded-lg pl-5 focus:outline-none focus:ring-2 focus:ring-red-400'
            value={formData.password}
            name='password'
            type='password'
            placeholder='Current Password'
            onChange={handleChange}
          />
        </div>
        <div className='mb-5'>
          <input
            className='h-12 w-full border-2 border-red-300 rounded-lg pl-5 focus:outline-none focus:ring-2 focus:ring-red-400'
            value={formData.updatedPassword}
            name='updatedPassword'
            type='password'
            placeholder='New Password'
            onChange={handleChange}
          />
        </div>
        <div className='mb-5'>
          <input
            className='h-12 w-full border-2 border-red-300 rounded-lg pl-5 focus:outline-none focus:ring-2 focus:ring-red-400'
            value={formData.confirmPassword}
            name='confirmPassword'
            type='password'
            placeholder='Confirm New Password'
            onChange={handleChange}
          />
        </div>
        {error && <p className='text-red-500'>{error}</p>}
        <div className='flex flex-col items-center'>
          <button
            className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full'
            type='submit'
          >
            Submit
          </button>
          {success && <p className='text-green-500 mt-3'>{success}</p>}
        </div>
      </form>
    </div>
  );
}
