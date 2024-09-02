import useLang from '@hooks/useLang'
import React, { FormEvent, useState, useCallback } from 'react'
import axiosInstance from 'services/instance'
import { MdPermMedia } from 'react-icons/md'
import { motion } from 'framer-motion' // For smooth animations
import { useDropzone } from 'react-dropzone'

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

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFormData((prevData) => ({
      ...prevData,
      files: acceptedFiles.length > 0 ? (acceptedFiles as unknown as FileList) : prevData.files,
    }))
    setImagePreviews(acceptedFiles.map((file) => URL.createObjectURL(file)))
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] }, // Corrected accept type
    multiple: true,
  })

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
      await axiosInstance.post('/notes/', data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      if (onPostAdded) {
        onPostAdded() // Trigger the refresh
      }
      // Reset formData to initial state after successful post
      setFormData(initialFormData)
      setImagePreviews([])
    } catch (error) {
      console.log('Error:', error)
    }
  }

  return (
    <>
      <div className='mr-2 bg-white px-6 py-4 rounded-lg inline-flex flex-col min-w-max w-[492px] 2xl:w-[45vh] items-center justify-center shadow-md '>
        <div className='flex items-center justify-center mb-5'>
          <p className='font-poppins text-gray-800 text-lg font-bold mb-4'>What's on your mind?</p>
        </div>

        <form onSubmit={handleSubmit} encType='multipart/form-data' className='w-full'>
          <div className='flex flex-col items-center justify-center'>
            <input
              className='h-12 w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500 placeholder-opacity-75'
              name='title'
              type='text'
              placeholder='Give your post a catchy title...'
              onChange={handleChange}
              value={formData.title}
            />
            <input
              className='h-14 w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500 placeholder-opacity-75'
              name='content'
              type='text'
              placeholder='Share your story, thoughts, or ideas...'
              onChange={handleChange}
              value={formData.content}
            />
          </div>

          <div
            {...getRootProps()}
            className={`mt-2 p-6 border-2 ${
              isDragActive ? 'border-red-400' : 'border-gray-300'
            } border-dashed rounded-lg cursor-pointer flex flex-col items-center justify-center relative`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className='text-gray-600'>Drop the files here ...</p>
            ) : (
              <>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <MdPermMedia className='text-2xl text-red-500' />
                </motion.div>
                <p className='text-gray-600'>Drag & drop some files here.</p>
                <div className='flex'>
                  <span className='text-sm text-gray-500 mt-2'>Add Media</span>
                  <div className='flex flex-wrap gap-2 mt-2'>
                    {imagePreviews.map((src, index) => (
                      <img
                        key={index}
                        src={src}
                        alt='Selected'
                        className='w-14 h-14 rounded-md object-cover shadow-sm absolute top-10 left-3' 
                      />
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          <div className='flex items-center justify-center mt-10'>
            <button
              type='submit'
              className='w-40 h-12 bg-gradient-to-r from-red-400 to-red-600 text-white font-semibold rounded-full hover:from-red-500 hover:to-red-700 transition-colors duration-300 shadow-lg'
            >
              Share
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddPost
