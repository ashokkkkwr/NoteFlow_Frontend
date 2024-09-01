import React, { useState } from 'react';
import Logo from './Logo';
import axiosInstance from 'services/instance';
import axios from 'axios';
import VerifyOtp from './VerifyOtp';

export default function ForgotPassword() {
  const [formData, setFormData] = useState({
    email: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    if (formData.email) data.append('email', formData.email);

    try {
      const response = await axiosInstance.post(`/auth/verify-email/`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccess(response.data.message);
      setIsSubmitted(true); // Set to true on successful submission
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
    <div className='flex flex-col justify-center items-center p-10 pb-20'>
      {!isSubmitted ? (
        <div className='flex flex-col justify-center items-center'>
          <div className='flex items-center justify-center mb-20'>
            <Logo />
          </div>
          <div className='flex flex-col items-center justify-center w-[40vh]'>
            <p className='text-gray-600 font-poppins text-sm'>
              Enter the email address associated with your account, and we will send you a verification OTP to your email.
            </p>
          </div>
          <div className='flex items-start justify-start w-full ml-5 mt-8'>
            <p>Email</p>
          </div>
          <div>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className='mt-4 ml-0 flex flex-col items-center'>
                <input
                  className='h-14 w-[43vh] border-2 border-red-300 rounded-lg pl-5 focus:outline-none focus:ring-2 focus:ring-red-400'
                  value={formData.email}
                  name='email'
                  type='email'
                  placeholder='Enter an Email'
                  onChange={handleChange}
                />
                <div className='mt-4 w-full flex justify-center'>
                  <button
                    className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 text-center w-[43vh]'
                    type='submit'
                  >
                    Continue
                  </button>
                </div>
                {success && <p className='text-green-500 mt-2'>{success}</p>}
                {error && <p className='text-red-500 mt-2'>{error}</p>}
              </div>
            </form>
          </div>
          <div className='mt-10 w-full justify-start flex'>
            <p className='text-sm font-poppins text-gray-600 mt-1'>
              Want to Login with a different Account?
            </p>
            <p className='text-red-500 font-poppins font-bold underline ml-2 cursor-pointer'>Login</p>
          </div>
        </div>
      ) : (
        <VerifyOtp email={formData.email} />
      )}
    </div>
  );
}
