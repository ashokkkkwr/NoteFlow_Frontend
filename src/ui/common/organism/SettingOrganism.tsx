import { useAutoCorrect } from '@context/AutoCorrectContext';
import React from 'react'

export default function SettingOrganism() {
  const { isAutoCorrectOn, toggleAutoCorrect } = useAutoCorrect();

  return (
    <div className='w-[116vh] h-[848px] bg-white mt-2 flex'>
      {/* Sidebar */}
      <div className='bg-gray-100 w-[250px] p-4'>
        <div className="relative group mb-4">
          <strong className="text-lg text-gray-700">Help & Support</strong>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-sm rounded py-1 px-2">
            Access resources and assistance for troubleshooting and inquiries.
          </div>
        </div>
        <div className='space-y-4'>
          <div>
            <p className='font-semibold'>Change Password</p>
            <p className='text-sm text-gray-600'>Update your current password to ensure account security.</p>
          </div>
          <div>
            <p className='font-semibold'>Forgot Password</p>
            <p className='text-sm text-gray-600'>Recover or reset your password if you’ve forgotten it.</p>
          </div>
          <div>
            <p className='font-semibold'>Language Settings</p>
            <p className='text-sm text-gray-600'>Select your preferred language for a customized experience.</p>
          </div>
          <div>
            <p className='font-semibold'>Appearance</p>
            <p className='text-sm text-gray-600'>Adjust the visual theme and layout of the application to your preference.</p>
          </div>

          <div>
            <p className='font-semibold'>Chat settings</p>
            <p className='text-sm text-gray-600'>Adjust the chat settings to your preference.</p>
            <div className='mt-2'>
                        <label className='flex items-center'>
                            <input
                                type='checkbox'
                                checked={isAutoCorrectOn}
                                onChange={toggleAutoCorrect}
                                className='form-checkbox h-5 w-5 text-blue-600'
                            />
                            <span className='ml-2 text-gray-700'>Enable Auto-Correct</span>
                        </label>
                    </div>
          </div>
        
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className='flex-1 bg-gray-50 p-6'>
        {/* Add your content here */}
      </div>
    </div>
  )
}
