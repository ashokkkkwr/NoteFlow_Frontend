import useLang from '@hooks/useLang'
import React, { FormEvent, useState } from 'react'
import axiosInstance from 'services/instance'
import Label from '../atoms/Lable'
import InputField from '../atoms/InputField'
import { authLabel } from '@data/localization/common/auth'
import Button from '../atoms/Button'
import { postLabel } from '@data/localization/common/landingPage/sharePost'
import { MdPermMedia } from 'react-icons/md'

interface FormData {
  title: string
  content: string
  files: FileList | null
}


interface AddPostProps {
  onPostAdded: () => void
}

const AddPost: React.FC<AddPostProps> = ({ onPostAdded }) => {
  const { lang } = useLang()
  const initialFormData: FormData = {
    title: '',
    content: '',
    files: null,
  }

  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : []
    setFormData((prevData) => ({
      ...prevData,
      files: e.target.files,
    }))
    setImagePreviews(files.map(URL.createObjectURL))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData()
    data.append('title', formData.title)
    data.append('content', formData.content)
    data.append('type', 'POST')
    if (formData.files) {
      for (let i = 0; i < formData.files.length; i++) {
        data.append('files', formData.files[i])
      }
    }
    try {
      const response = await axiosInstance.post('/notes/', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      if (onPostAdded) {
        onPostAdded() // Trigger the refresh
      }
      // Reset formData to initial state after successful post
      setFormData(initialFormData)
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <>
      <div className='mt-2 mr-2 bg-white p-4 rounded-lg inline-flex flex-col min-w-max w-[492px] 2xl:w-[45vh] items-center justify-center'>
      <div className='flex items-center justify-center'>
        <p className='font-poppins text-red-700 text-base'>Share your thoughts.</p>
      </div>

      <div>
        <form onSubmit={handleSubmit} encType='multipart/form-data'>
          <div className='mt-6'>
            {/* <div className='ml-3'>
              <Label name={'title'} label={postLabel.title[lang]} required={true} />
            </div> */}
            <input
            className='h-14 w-[35vh] border-b-2  pr-10 pl-5 focus:outline-none'
              name={'title'}
              type={'title'}
              placeholder={postLabel.enterTitle[lang]}
              onChange={handleChange}
              value={formData.title}
            />
          </div>
          <div className='mt-6'>
            {/* <div className='ml-3 mt-6'>
              <Label name={'content'} label={postLabel.content[lang]} required={true} />
            </div> */}
            <input
            className='h-14 w-[35vh] border-b-2  pr-10 pl-5 focus:outline-none'
            
              name={'content'}
              type={'content'}
              placeholder={postLabel.enterContent[lang]}
              onChange={handleChange}
              value={formData.content}
            />
          </div>
          <div className=' flex'>
            <div className='mt-8 ml-3'>
                <label className='cursor-pointer flex items-center gap-1 text-red-500 '>
                <MdPermMedia className='text-2xl' />

                  <input
                    className='h-11 w-[25vh] border-b-2 border-pink-500 hidden'
                    name={'files'}
                    type={'file'}
                    multiple
                    onChange={handleFileChange}
                  />
                  <span className='text-sm text-gray-600'>Media</span>
                </label>
                </div>
                <div className='mt-3 ml-3'>
                {imagePreviews.map((src, index) => (
                  <img key={index} src={src} alt='Selected' className='w-14 h-14 rounded-md object-cover' />
                ))}
                </div>
              </div>
              <div className='flex gap-2 mt-2'>
               
              </div>
          <div className='mt-9 ml-0'>
            <Button type={'submit'} buttonText={postLabel.share[lang]} />
          </div>
        </form>
      </div>
      </div>
    </>
  )
}

export default AddPost
