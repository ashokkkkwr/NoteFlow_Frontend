import { authLabel } from '@data/localization/common/auth';
import useLang from '@hooks/useLang';
import Button from '@ui/common/atoms/Button';
import InputField from '@ui/common/atoms/InputField';
import { MdDangerous } from "react-icons/md";

import { Link, useNavigate } from 'react-router-dom';
import { navbarLabel } from '@data/localization/common/landingPage/navbar';
import { useState } from 'react';
import axiosInstance from 'services/instance';
import axios from 'axios';
import React from 'react';
import { GoDash } from "react-icons/go";
import { FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"; // Import eye icons

const Login = () => {
  const { lang } = useLang();
  const navigate = useNavigate();
  const goBack = () => {
    navigate('/');
  };

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);

    try {
      const response = await axiosInstance.post('/auth', data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const accessToken = response?.data?.data?.tokens?.accessToken;
      if (accessToken) {
        // Store the token in session storage
        sessionStorage.setItem('accessToken', accessToken);
        goBack();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <div className='flex items-center justify-center h-screen bg-gradient-to-r from-red-50 to-red-100'>
        <div className='bg-white w-[58vh] h-[85vh] rounded-3xl shadow-2xl'>
          <p className='text-3xl font-bold font-poppins mt-14 ml-44'>User Login</p>
          <p className='ml-32 mt-5 w-[29vh] text-center font-poppins text-lg'>
            Hey, Enter Your Details to get sign in to your account.
          </p>
          <form onSubmit={handleSubmit} encType='multipart/form-data'>
            <div className='mt-16 ml-16'>
              <input
                className='h-14 w-[43vh] border rounded-xl pl-5'
                name={'email'}
                type={'email'}
                placeholder={authLabel.enterYourEmail[lang]}
                onChange={handleChange}
              />
            </div>
            <div className='mt-5 ml-16 flex'>
              <input
                className='h-14 w-[43vh] border rounded-xl pr-10 pl-5'
                name={'password'}
                type={showPassword ? 'text' : 'password'}
                placeholder={authLabel.enterYourPassword[lang]}
                onChange={handleChange}
              />
              <div className='mt-3 ml-1'>
                <button
                  type='button'
                  onClick={togglePassword}
                  className=''
                >

                  {showPassword ? <AiFillEyeInvisible size={30} /> : <AiFillEye size={30} />}
                </button>
              </div>
            </div>

            <p className='mt-6 ml-20 font-poppins text-sm text-red-500'>Having Trouble Sign in?</p>
            <div className='flex'>
            <MdDangerous className=''/>

            <p className='mt-6 ml-20 font-poppins text-sm text-red-500'>{errorMessage}</p>
            </div>
            <div>
              <button
                className='bg-red-400 w-[43vh] h-14 rounded-xl ml-16 mt-10 hover:bg-red-500'
                type={'submit'}
              >
                <p className='font-poppins text-white'>Sign in</p>
              </button>
            </div>

            <p className='mt-8 ml-48 flex font-poppins'>
              <GoDash className='mt-1' /> or signin with<GoDash className='mt-1' />
            </p>
            <div className='flex'>
              <button className='mt-10 ml-[10vh] border rounded-xl h-14 w-44 flex items-center justify-center'>
                <p className='flex text-xl font-bold font-poppins'>
                  <span className='mt-1'>
                    <FaGoogle />
                  </span>{' '}
                  <span className='ml-3'>Google</span>
                </p>
              </button>
              <button className='mt-10 ml-2 border rounded-xl h-14 w-44 flex items-center justify-center'>
                <p className='flex text-xl font-bold font-poppins'>
                  <span className='mt-1'>
                    <FaFacebook />
                  </span>{' '}
                  <span className='ml-3'>Facebook</span>
                </p>
              </button>
            </div>
            <div className='flex mt-10 ml-32'>
              <p className='font-poppins'>Don't Have An Account?</p>
              <Link to='/auth/user/signup'>
                <p className='ml-1 font-poppins font-semibold'>Request Now</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
