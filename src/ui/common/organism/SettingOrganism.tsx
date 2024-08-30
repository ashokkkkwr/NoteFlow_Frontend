import { useAutoCorrect } from '@context/AutoCorrectContext';
import React, { useState } from 'react';
import LanguageToggle from '../molecules/LanguageToggle';
import PasswordChange from '../molecules/PasswordChange';
import ForgotPassword from '../molecules/ForgotPassword';

export default function SettingOrganism() {
  const { isAutoCorrectOn, toggleAutoCorrect } = useAutoCorrect();
  const [selectedSetting, setSelectedSetting] = useState(null);

  const handleSettingClick = (setting: any) => {
    setSelectedSetting(setting);
  };

  return (
    <div className='w-[116vh] h-[848px] bg-white mt-2 flex'>
      {/* Sidebar */}
      <div className='bg-gray-100 w-[250px] p-4'>
        <strong className="text-lg text-gray-700">Help & Support</strong>
        <div className='space-y-4 mt-4'>
          {[
            { id: 'changePassword', label: 'Change Password', description: 'Update your current password to ensure account security.' },
            { id: 'forgotPassword', label: 'Forgot Password', description: 'Recover or reset your password if you’ve forgotten it.' },
            { id: 'languageSettings', label: 'Language Settings', description: 'Select your preferred language for a customized experience.' },
            { id: 'appearance', label: 'Appearance', description: 'Adjust the visual theme and layout of the application to your preference.' },
            { id: 'chat', label: 'Chat Settings', description: 'Adjust the chat settings to your preference.' },
          ].map(({ id, label, description }) => (
            <div 
              key={id} 
              onClick={() => handleSettingClick(id)} 
              className={`cursor-pointer group p-2 rounded-lg ${selectedSetting === id ? 'bg-red-100 text-red-600' : 'hover:bg-gray-200'}`}
            >
              <p className={`font-medium ${selectedSetting === id ? 'text-red-600' : 'text-gray-700'}`}>
                {label}
              </p>
              <p className='text-sm text-gray-600'>{description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex items-center justify-center bg-gray-50 p-6 w-full'>
        {selectedSetting === 'changePassword' && (
          <div className='bg-white p-4 shadow-md rounded-lg w-[80%] max-w-[600px]'>
            <h2 className='text-xl font-medium mb-4 text-center'>Change Password</h2>
            <p className='text-center mb-4'>Here you can change your password.</p>
            <PasswordChange />
          </div>
        )}

        {selectedSetting === 'forgotPassword' && (
          <div className='bg-white p-4 shadow-md rounded-lg w-[80%] max-w-[600px]'>
            <h2 className='text-xl font-medium mb-4 text-center'>Forgot Password</h2>
            <p className='text-center mb-4'>Here you can recover your password.</p>
            <ForgotPassword />
          </div>
        )}

        {selectedSetting === 'languageSettings' && (
          <div className='bg-white p-4 shadow-md rounded-lg w-[80%] max-w-[600px]'>
            <h2 className='text-xl font-medium mb-4 text-center'>Language Settings</h2>
            <LanguageToggle />
          </div>
        )}

        {selectedSetting === 'appearance' && (
          <div className='bg-white p-4 shadow-md rounded-lg w-[80%] max-w-[600px]'>
            <h2 className='text-xl font-medium mb-4 text-center'>Appearance</h2>
            <p className='text-center'>Here you can adjust the appearance of the application.</p>
            {/* Add relevant inputs and functionality */}
          </div>
        )}

        {selectedSetting === 'chat' && (
          <div className='bg-white p-4 shadow-md rounded-lg w-[80%] max-w-[600px]'>
            <h2 className='text-xl font-medium mb-4 text-center'>Chat Settings</h2>
            <label className='flex items-center justify-center'>
              <input
                type='checkbox'
                checked={isAutoCorrectOn}
                onChange={toggleAutoCorrect}
                className='form-checkbox h-5 w-5 text-blue-600'
              />
              <span className='ml-2 text-gray-700'>Enable Auto-Correct</span>
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
