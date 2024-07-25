import { authLabel } from '@data/localization/common/auth';
import useLang from '@hooks/useLang';
import Button from '@ui/common/atoms/Button';
import InputField from '@ui/common/atoms/InputField';
import Label from '@ui/common/atoms/Lable';
import { Link, useNavigate } from 'react-router-dom';
import { navbarLabel } from '@data/localization/common/landingPage/navbar';
import { useState } from 'react';
import axiosInstance from 'services/instance';
import axios from 'axios';
import React from 'react';

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
  const [errorMessage,setErrorMessage]=useState('')

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const data = new FormData();
    data.append('email', formData.email);
    data.append('password', formData.password)

    try {
      const response = await axiosInstance.post('/auth', data, {
        headers: {
          'Content-Type': 'application/json',
        },
       
      });
     
    const accessToken=response?.data?.data?.tokens?.accessToken
      if (accessToken) {
        // Store the token in session storage
        sessionStorage.setItem('accessToken', accessToken);
       goBack()
    }
      }
      

      
     catch (error) {
     if(axios.isAxiosError(error)){
      setErrorMessage(error.response?.data.message)
     }
    }
  };

  return (
    <>
      <Button type={'button'} buttonText={authLabel.goBack[lang]} onClick={goBack} />
      <h1>{authLabel.userLogin[lang]}</h1>
      <form onSubmit={handleSubmit} encType='multipart/form-data'>
        <div>
          <Label name={'email'} label={authLabel.email[lang]} />
          <InputField
            name={'email'}
            type={'email'}
            placeholder={authLabel.enterYourEmail[lang]}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label name={'password'} label={authLabel.password[lang]} />
          <InputField
            name={'password'}
            type={'password'}
            placeholder={authLabel.enterYourPassword[lang]}
            onChange={handleChange}
          />
        </div>
        {errorMessage}
        <Button type={'submit'} buttonText={navbarLabel.login[lang]} />
      </form>
    </>
  );
};

export default Login;
