import React, { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authLabel } from '@data/localization/common/auth';
import useLang from '@hooks/useLang';
import axiosInstance from 'services/instance';
import { navbarLabel } from '@data/localization/common/landingPage/navbar';
import axios from 'axios';

// Define a type for formData
interface FormData {
  email: string;
  password: string;
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  role: string;
  files: FileList | null;
}

const Signup: React.FC = () => {

          const [errorMessage,setErrorMessage]=useState('')
  const { lang } = useLang();
  const navigate = useNavigate();
  const goLogin=()=>{
    navigate('/auth/user/login')
  }
  const goBack = () => {
    navigate('/');
  };

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
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      files: e.target.files,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password);
    data.append('first_name', formData.firstName);
    data.append('middle_name', formData.middleName);
    data.append('last_name', formData.lastName);
    data.append('phone_number', formData.phoneNumber);
    data.append('role', formData.role);
    data.append('type', 'PROFILE');

    if (formData.files) {
      for (let i = 0; i < formData.files.length; i++) {
        data.append('files', formData.files[i]);
      }
    }

    try {
      await axiosInstance.post('/user/signup', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      goLogin();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setErrorMessage(error.response?.data.message);
      }    }
  };

  return (
    <div className='flex items-center justify-center h-screen bg-red-100'>
      <div className='bg-white w-[58vh] h-auto rounded-3xl shadow-2xl p-8'>
        <p className='text-3xl font-bold font-poppins mt-14 ml-20'>
          {authLabel?.userSignup?.[lang] || 'User Signup'}
        </p>
        <p className='ml-12 mt-5 w-[29vh] text-center font-poppins text-lg'>
          {authLabel?.enterYourDetails?.[lang] || 'Enter your details to sign up'} {/* Assuming there's a localization key for this */}
        </p>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className='mt-8 ml-8'>
            <input
              className='h-14 w-[43vh] border rounded-xl'
              name={'email'}
              type={'email'}
              placeholder={authLabel?.enterYourEmail?.[lang] || 'Enter your email'}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5 ml-8'>
            <input
              className='h-14 w-[43vh] border rounded-xl'
              name={'password'}
              type={'password'}
              placeholder={authLabel?.enterYourPassword?.[lang] || 'Enter your password'}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5 ml-8'>
            <input
              className='h-14 w-[43vh] border rounded-xl'
              name={'role'}
              type={'text'}
              placeholder={authLabel?.enterYourRole?.[lang] || 'Enter your role'}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5 ml-8'>
            <input
              className='h-14 w-[43vh] border rounded-xl'
              name={'firstName'}
              type={'text'}
              placeholder={authLabel?.enterYourFirstName?.[lang] || 'Enter your first name'}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5 ml-8'>
            <input
              className='h-14 w-[43vh] border rounded-xl'
              name={'middleName'}
              type={'text'}
              placeholder={authLabel?.enterYourMiddleName?.[lang] || 'Enter your middle name'}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5 ml-8'>
            <input
              className='h-14 w-[43vh] border rounded-xl'
              name={'lastName'}
              type={'text'}
              placeholder={authLabel?.enterYourLastName?.[lang] || 'Enter your last name'}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5 ml-8'>
            <input
              className='h-14 w-[43vh] border rounded-xl'
              name={'phoneNumber'}
              type={'text'}
              placeholder={authLabel?.enterYourPhoneNumber?.[lang] || 'Enter your phone number'}
              onChange={handleChange}
            />
          </div>
          <div className='mt-5 ml-8'>
            <input
              className='h-14 w-[43vh] border rounded-xl'
              name={'files'}
              type={'file'}
              multiple
              onChange={handleFileChange}
            />
          </div>
          <p className='mt-6 ml-20 font-poppins text-sm text-red-500'> {errorMessage}</p>
         
          <button
            className='bg-red-400 w-[43vh] h-14 rounded-xl ml-8 mt-10 hover:bg-red-500'
            type={'submit'}
          >
            <p className='font-poppins text-white'>{navbarLabel?.signup?.[lang] || 'Sign up'}</p>
          </button>
          <div className='flex mt-10 ml-32'>
            <p className='font-poppins'>{authLabel?.alreadyHaveAccount?.[lang] || 'Already have an account?'}</p>
            <Link to='/auth/user/login'>
              <p className='ml-1 font-poppins font-semibold'>{authLabel?.login?.[lang] || 'Login'}</p>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
