import React, { useState } from 'react';
import axiosInstance from 'services/instance';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';

export default function ChangePasscode({ email }: { email: string }) {
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
    email: email,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const data = new FormData();
    if (formData.email) data.append('email', formData.email);
    if (formData.newPassword) data.append('newPassword', formData.newPassword);

    try {
      const response = await axiosInstance.post(`/auth/reset-password`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccess(response.data.message);
      setTimeout(() => goBack(), 2000); // Redirect after 2 seconds
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
        setSuccess('');
      }
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
    // <div className='flex flex-col justify-center items-center p- pb- bg-black'>
      <div className='flex flex-col justify-center items-center'>
        <div className='flex items-center justify-center mb-20'>
          <Logo />
        </div>
        <div className='flex flex-col items-center justify-center w-[40vh]'>
          <p className='text-gray-600 font-poppins text-sm text-center'>
            Enter your new password below.
          </p>
        </div>
        <form onSubmit={handleSubmit} encType='multipart/form-data' className='mt-8 w-[43vh]'>
          <div className='flex flex-col items-center'>
            <div className='mb-4'>
              <input
                className='h-12 w-[43vh] border-2 border-red-300 rounded-lg pl-5 focus:outline-none focus:ring-2 focus:ring-red-400'
                value={formData.newPassword}
                name='newPassword'
                type='password'
                placeholder='New Password'
                onChange={handleChange}
              />
            </div>
            <div className='mb-4'>
              <input
                className='h-12 w-[43vh] border-2 border-red-300 rounded-lg pl-5 focus:outline-none focus:ring-2 focus:ring-red-400'
                value={formData.confirmPassword}
                name='confirmPassword'
                type='password'
                placeholder='Confirm New Password'
                onChange={handleChange}
              />
            </div>
            <div className='mt-4 w-full flex justify-center'>
              <button
                className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 text-center w-full'
                type='submit'
              >
                Submit
              </button>
            </div>
            {success && <p className='text-green-500 mt-2'>{success}</p>}
            {error && <p className='text-red-500 mt-2'>{error}</p>}
          </div>
        </form>
        <div className='mt-10 w-full flex justify-start'>
          <p className='text-sm font-poppins text-gray-600 mt-1'>
            Remembered your password?
          </p>
          <p className='text-red-500 font-poppins font-bold underline ml-2 cursor-pointer' onClick={() => navigate('/')}>
            Login
          </p>
        </div>
      </div>
    // </div>
  );
}
