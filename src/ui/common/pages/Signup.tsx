import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authLabel } from '@data/localization/common/auth';
import useLang from '@hooks/useLang';
import Button from '@ui/common/atoms/Button';
import InputField from '@ui/common/atoms/InputField';
import Label from '@ui/common/atoms/Lable';
import { navbarLabel } from '@data/localization/common/landingPage/navbar';
import axiosInstance from 'services/instance';

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
  const { lang } = useLang();
  const navigate = useNavigate();

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

  // Event handler types
  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e:any) => {
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
      const response = await axiosInstance.post('/user/signup', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      });
      
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <div>
      <Button type={'button'} buttonText={authLabel.goBack[lang]} onClick={goBack} />
      <h1>{authLabel.userSignup[lang]}</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <Label name={'email'} label={authLabel.email[lang]} required={true} />
          <InputField name={'email'} type={'email'} placeholder={authLabel.enterYourEmail[lang]}  onChange={handleChange} />
        </div>
        <div>
          <Label name={'password'} label={authLabel.password[lang]} required={true} />
          <InputField name={'password'} type={'password'} placeholder={authLabel.enterYourPassword[lang]} onChange={handleChange} />
        </div>
        <div>
          <Label name={'role'} label={authLabel.role[lang]} required={true} />
          <InputField name={'role'} type={'text'} placeholder={authLabel.enterYourRole[lang]} onChange={handleChange} />
        </div>
        <div>
          <Label name={'firstName'} label={authLabel.firstName[lang]} required={true} />
          <InputField name={'firstName'} type={'text'} placeholder={authLabel.enterYourFirstName[lang]} onChange={handleChange} />
        </div>
        <div>
          <Label name={'middleName'} label={authLabel.middleName[lang]} required={true} />
          <InputField name={'middleName'} type={'text'} placeholder={authLabel.enterYourMiddleName[lang]} onChange={handleChange} />
        </div>
        <div>
          <Label name={'lastName'} label={authLabel.lastName[lang]} required={true} />
          <InputField name={'lastName'} type={'text'} placeholder={authLabel.enterYourLastName[lang]} onChange={handleChange} />
        </div>
        <div>
          <Label name={'phoneNumber'} label={authLabel.phoneNumber[lang]} required={true} />
          <InputField name={'phoneNumber'} type={'text'} placeholder={authLabel.enterYourPhoneNumber[lang]} onChange={handleChange} />
        </div>
        <div>
          <Label name={'files'} label={authLabel.uploadFiles[lang]} required={true} />
          <InputField name={'files'} type={'file'} multiple onChange={handleFileChange} />
        </div>
        <Button type={'submit'} buttonText={navbarLabel.signup[lang]} />
      </form>
    </div>
  );
};

export default Signup;
