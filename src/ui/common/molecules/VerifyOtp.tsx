import React, { useState, useRef } from 'react';
import axios from 'axios';
import axiosInstance from 'services/instance';
import ChangePasscode from './ChangePasscode';
import Logo from './Logo';

export default function VerifyOtp({ email }: { email: string }) {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '']);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const concatenatedOtp = otp.join('');

    try {
      const response = await axiosInstance.post(`/auth/verify-otp/`, {
        email,
        otp: concatenatedOtp,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setSuccess(response.data.message);
      setIsSubmitted(true);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message);
        setSuccess('');
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus(); // Move to the next input
    }
    
    setError('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus(); // Move to the previous input
    }
  };

  return (
    <div className='flex flex-col justify-center items-center p-10 pb-20'>
      {isSubmitted ? (
        <ChangePasscode email={email} />
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <div className='flex items-center justify-center mb-20'>
            <Logo />
          </div>
          <div className='flex flex-col items-center justify-center w-[40vh]'>
            <p className='text-gray-600 font-poppins text-sm text-center'>
              We have sent a verification code to your email address. Please enter the code below.
            </p>
          </div>
          <form onSubmit={handleSubmit} className='mt-8 w-[40vh]'>
            <div className='flex justify-between mb-6'>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el!)}
                  className='h-14 w-12 border-2 border-red-300 rounded-lg text-center text-lg font-medium focus:outline-none focus:ring-2 focus:ring-red-400'
                  type='text'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)} 
                />
              ))}
            </div>
            <div className='mt-5 w-full flex justify-center'>
              <button
                className='text-white bg-red-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-3 w-full'
                type='submit'
              >
                Submit
              </button>
              {success && <p className='text-green-500 mt-2'>{success}</p>}
              {error && <p className='text-red-500 mt-2'>{error}</p>}
            </div>
          </form>
          <div className='mt-10 w-full justify-start flex'>
            <p className='text-sm font-poppins text-gray-600 mt-1 '>Didn't receive a code?</p>
            <p className='text-red-500 font-poppins text- font-bold underline'>Resend</p>
          </div>
        </div>
      )}
    </div>
  );
}
