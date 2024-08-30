import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from 'services/instance'
import InputField from '../atoms/InputField'
import CommentComponent from './CommentComponent'
import { useRightSidebar } from '@context/RightSidebarContext'
import { useSidebar } from '@context/SidebarContext'
import { jwtDecode } from 'jwt-decode'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaRegCommentDots, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import { MdBrowserUpdated } from 'react-icons/md'
import Modal from './Modal'
import { AiOutlineLike } from 'react-icons/ai'
import { BiRepost } from 'react-icons/bi'
import { FiShare2 } from 'react-icons/fi'

export interface Comment {
  id: string
  comment: string
  replies: Comment[]
  user: {
    id: string
    email: string
    details: {
      first_name: string
      last_name: string
      profileImage: Media[]
    }
  }
}

export interface Note {
  id: string
  title: string
  content: string
  img: string
  createdAt: string
  noteMedia: Media[]
  user: {
    id: string
    email: string
    details: {
      first_name: string
      last_name: string
      profileImage: Media[]
    }
  }
  comments: Comment[]
}

interface PostsProps {
  refreshPosts: number
}

interface Media {
  id: string
  path: string
}
interface FormData {
  title: string
  content: string
  files: FileList | null
}

const Posts: React.FC<PostsProps> = ({ refreshPosts }) => {
  const [loggedInUserId, setLoggedInUserId] = useState<string | null>(null)
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null)
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
    files: null,
  })
  const { isRightSidebarOpen } = useRightSidebar()
  const { isSidebarOpen } = useSidebar()
  const [notes, setNotes] = useState<Note[]>([])
  const [comments, setComments] = useState<Record<string, Comment[]>>({})
  const [topLevelCommentForm, setTopLevelCommentForm] = useState<{ [key: string]: string }>({})
  const [replyForm, setReplyForm] = useState<{ [key: string]: { [key: string]: string } }>({})
  const [visibleCommentForm, setVisibleCommentForm] = useState<string | null>(null)
  const [visibleReplyForm, setVisibleReplyForm] = useState<{ [key: string]: string }>({})
  const [error, setError] = useState('')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [openFormId, setOpenFormId] = useState<string | null>(null)
  const [openDeleteId, setOpenDeleteId] = useState<string | null>(null)
  const [showComments, setShowComments] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleCommentsCount, setVisibleCommentsCount] = useState<Record<string, number>>({})
  const [visibleRepliesCount, setVisibleRepliesCount] = useState<Record<string, number>>({})
  const commentsPerPage = 1
  const repliesPerPage = 1
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)

  const handleShowMoreComments = (noteId: string) => {
    setVisibleCommentsCount((prev) => ({
      ...prev,
      [noteId]: (prev[noteId] || commentsPerPage) + commentsPerPage,
    }))
  }
  const handleShowLessComments = (noteId: string) => {
    setVisibleCommentsCount((prev) => ({
      ...prev,
      [noteId]: Math.max(commentsPerPage, (prev[noteId] || commentsPerPage) - commentsPerPage),
    }))
  }
  const handleShowMoreReplies = (noteId: string, commentId: string) => {
    setVisibleRepliesCount((prevState) => ({
      ...prevState,
      [`${noteId}_${commentId}`]: (prevState[`${noteId}_${commentId}`] || repliesPerPage) + repliesPerPage,
    }))
  }

  const handleShowLessReplies = (noteId: string, commentId: string) => {
    setVisibleRepliesCount((prevState) => ({
      ...prevState,
      [`${noteId}_${commentId}`]: repliesPerPage, // Reset to initial number of replies
    }))
  }

  const handleTopLevelCommentChange = (noteId: string, value: string) => {
    setTopLevelCommentForm((prev) => ({ ...prev, [noteId]: value }))
  }

  const handleReplyChange = (noteId: string, commentId: string, value: string) => {
    setReplyForm((prev) => ({
      ...prev,
      [noteId]: { ...prev[noteId], [commentId]: value },
    }))
  }

  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get('/notes/all', {
        headers: { 'Content-Type': 'application/json' },
      })
      setNotes(response.data.data)
      console.log('🚀 ~ fetchNotes ~ response.data.data:', response.data.data)
    } catch (error) {
      console.log(error)
    }
  }

  const fetchCommentsForNote = async (noteId: string) => {
    try {
      const response = await axiosInstance.get(`/comment/${noteId}`)
      console.log(response, 'commentsss')
      setComments((prevComments) => ({ ...prevComments, [noteId]: response.data.data }))
    } catch (error) {
      console.log(error)
    }
  }

  const handleTopLevelCommentSubmit = async (e: React.FormEvent<HTMLFormElement>, noteId: string) => {
    e.preventDefault()
    try {
      await axiosInstance.post(`/comment/${noteId}`, {
        comment: topLevelCommentForm[noteId] || '',
        parentId: '',
      })
      setTopLevelCommentForm((prev) => ({ ...prev, [noteId]: '' }))
      fetchCommentsForNote(noteId)
    } catch (error) {
      console.log(error)
    }
  }

  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>, noteId: string, commentId: string) => {
    e.preventDefault()
    try {
      await axiosInstance.post(`/comment/${noteId}`, {
        comment: replyForm[noteId][commentId] || '',
        parentId: commentId,
      })
      setReplyForm((prev) => ({
        ...prev,
        [noteId]: { ...prev[noteId], [commentId]: '' },
      }))
      fetchCommentsForNote(noteId)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [refreshPosts])

  useEffect(() => {
    notes.forEach((note) => {
      fetchCommentsForNote(note.id)
    })
  }, [notes])

  const toggleCommentFormVisibility = (noteId: string) => {
    setVisibleCommentForm(visibleCommentForm === noteId ? null : noteId)
  }
  const toggleReplyFormVisibility = (noteId: string, commentId: string) => {
    setVisibleReplyForm((prev) => ({
      ...prev,
      [noteId]: prev[noteId] === commentId ? '' : commentId,
    }))
  }
  useEffect(() => {
    const token = sessionStorage.getItem('accessToken')
    if (token) {
      const decoded: any = jwtDecode(token)
      setLoggedInUserId(decoded.id)
    }
  }, [])
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdownId(null)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = (noteId: string) => {
    setOpenDropdownId((prevId) => (prevId === noteId ? null : noteId))
  }
  const toggleForm = (noteId: string) => {
    setOpenFormId((prevId) => (prevId === noteId ? null : noteId))
  }

  const handleChange = (e: any) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const toggleDelete = (noteId: string) => {
    setOpenDeleteId(noteId)
    setIsModalOpen(true) // Open the modal
  }

  const handleConfirmDelete = async () => {
    if (openDeleteId) {
      await handleDelete(openDeleteId)
      setIsModalOpen(false) // Close the modal after delete
    }
  }

  const handleDelete = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/notes/${id}`)
      console.log(response)
      fetchNotes()
    } catch (error) {
      console.log('🚀 ~ handleDelete ~ error:', error)
    }
  }

  const handleSubmit = async (e: any, id: string) => {
    e.preventDefault()
    const data = new FormData()

    if (formData.title) data.append('title', formData.title)
    if (formData.content) data.append('content', formData.content)
    data.append('type', 'POST')
    if (formData.files && formData.files.length > 0) {
      for (let i = 0; i < formData.files.length; i++) {
        data.append('files', formData.files[i])
      }
    }

    try {
      const response = await axiosInstance.patch(`/notes/${id}`, data, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      console.log(response)
      setOpenFormId(null)
      fetchNotes()
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message)
      }
    }
  }

  function getTimeDifference(createdAt: string) {
    const noteDate = new Date(createdAt)
    const now = new Date()
    const diffMs = now.getTime() - noteDate.getTime()

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))

    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`
    }
  }

  const handleFileChange = (e: any) => {
    setFormData((prevData) => ({
      ...prevData,
      files: e.target.files,
    }))
  }

  const handlePostSelect = (noteId: string) => {
    setSelectedPostId(selectedPostId === noteId ? null : noteId)
  }
  const [activeButton, setActiveButton] = useState<string | null>(null)

  const handleButtonClick = (button: string) => {
    setActiveButton(activeButton === button ? null : button)
  }
  return (
    <div
      className={` mt-3 bg-grey w-[110vh] h-[10vh]${isRightSidebarOpen ? 'hidden' : 'block'} ${
        isSidebarOpen ? 'hidden' : 'block'
      } 2xl:block overflow-auto`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {error && <p>{error}</p>}
      <ul>
        {notes.map((note) => (
          <div key={note.id} className='mb-20  w-auto border bg-white shadow-xl rounded-lg p-5 '>
            {openFormId === note.id && (
              <div className='flex justify-end mr-10 mt-5'>
                <button onClick={() => toggleForm(note.id)} className='text-red-500 hover:text-red-700'>
                  <FaTimes size={24} />
                </button>
              </div>
            )}

            {openFormId === note.id ? (
              <div className='flex items-center justify-center'>
                <form onSubmit={(e) => handleSubmit(e, note.id)} encType='multipart/form-data'>
                  <div className='mt-16 ml-'>
                    <input
                      className='h-14 w-[43vh] border-b-2 pl-5 focus:outline-none'
                      name='title'
                      type='title'
                      placeholder='Title'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mt-5 ml- flex'>
                    <input
                      className='h-14 w-[43vh] border-b-2 pr-10 pl-5 focus:outline-none'
                      name='content'
                      placeholder='Content'
                      onChange={handleChange}
                    />
                  </div>
                  <div className='mt-16 ml-'>
                    <input
                      className='h-11 w-[25vh] border-b-2 border-pink-500'
                      name={'files'}
                      type={'file'}
                      multiple
                      onChange={handleFileChange}
                    />
                  </div>
                  <div>
                    <button className='bg-red-400 w-[43vh] h-14 rounded-xl ml- mt-5 hover:bg-red-500' type='submit'>
                      <p className='font-poppins text-white flex items-center justify-center'>
                        <MdBrowserUpdated />
                        Update
                      </p>
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <>
                <div className='flex items-center mb-4 mt-4 justify-between'>
                  <div className='flex'>
                    <div className=''>
                      {note.user.details.profileImage.map((media) => (
                        <div key={media.id} className='flex items-center justify-center'>
                          <img
                            src={media.path}
                            alt={`Profile ${media.id}`}
                            className='w-12 h-12 rounded-full object-contain'
                          />
                        </div>
                      ))}
                    </div>
                    <div className='flex  ml-3 mt-3'>
                      <p className='mr-1'>{note.user.details.first_name}</p>
                      <p>{note.user.details.last_name}</p>
                    </div>
                  </div>

                  <div>
                    <p className='mr-20 text-sm text-gray-400'>{getTimeDifference(note.createdAt)}</p>
                  </div>

                  <div className='relative'>
                    <div className='flex items-end mr-5 ' onClick={() => toggleDropdown(note.id)}>
                      {loggedInUserId === note.user.id && <BsThreeDotsVertical className='text-xl' />}
                      {openDropdownId === note.id && (
                        <div
                          ref={dropdownRef}
                          className='absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-2xl z-50'
                        >
                          <ul>
                            <li className='p-2 hover:bg-gray-200 cursor-pointer' onClick={() => toggleForm(note.id)}>
                              Edit
                            </li>
                            {/* <li className='p-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleDelete(note.id)}> */}
                            <li className='p-2 hover:bg-gray-200 cursor-pointer' onClick={() => toggleDelete(note.id)}>
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='mb-4 '>
                  <h3 className='text-lg font-semibold mt-10'>{note.title}</h3>
                  <p>{note.content}</p>
                </div>
                <div className='flex justify-center items-center'>
                  {note.noteMedia.map((media) => (
                    <div key={media.id} className='mb-4'>
                      <img src={media.path} alt={`Media ${media.id}`} className='w-[85vh] h-[65vh] object-contain' />
                    </div>
                  ))}
                </div>
                <div className='flex justify-between px-28 py-3'>
                  <div>
                    <p
                      className={`flex cursor-pointer ${activeButton === 'like' ? 'text-red-500' : ''}`}
                      onClick={() => handleButtonClick('like')}
                    >
                      <AiOutlineLike />
                      Like
                    </p>
                  </div>
                  <div>
                    <button onClick={() => handlePostSelect(note.id)}>
                      {selectedPostId === note.id ? (
                        <div className='text-blue-500'>'Hide Comments'</div>
                      ) : (
                        <div className='flex'>
                          <FaRegCommentDots /> Show Comments
                        </div>
                      )}
                    </button>
                  </div>
                  <div>
                    <p className='font-poppins flex'>
                      <BiRepost />
                      Repost
                    </p>
                  </div>
                  <div>
                    <p className='flex'>
                      <FiShare2 />
                      share
                    </p>
                  </div>
                </div>

                {selectedPostId === note.id && (
                  <div className='p-5 bg-gray-100 rounded-xl'>
                    <button onClick={() => toggleCommentFormVisibility(note.id)}>
                      {/* {visibleCommentForm === note.id ? 'Cancel' : 'Add a comment'} */}
                    </button>
                    {/* {visibleCommentForm === note.id && ( */}
                    <form onSubmit={(e) => handleTopLevelCommentSubmit(e, note.id)}>
                      <InputField
                        name='comment'
                        type='text'
                        placeholder='Add a comment'
                        onChange={(e) => handleTopLevelCommentChange(note.id, e.target.value)}
                        value={topLevelCommentForm[note.id] || ''}
                      />
                      <button type='submit'>Submit</button>
                    </form>
                    {/* )} */}
                    <div>
                      {comments[note.id]?.slice(0, visibleCommentsCount[note.id] || commentsPerPage).map((comment) => (
                        <CommentComponent
                          key={comment.id}
                          noteId={note.id}
                          comment={comment}
                          handleReplySubmit={handleReplySubmit}
                          handleReplyChange={handleReplyChange}
                          visibleReplyForm={visibleReplyForm}
                          replyForm={replyForm}
                          toggleReplyFormVisibility={toggleReplyFormVisibility}
                          handleShowMoreReplies={handleShowMoreReplies}
                          handleShowLessReplies={handleShowLessReplies}
                          visibleRepliesCount={visibleRepliesCount}
                          repliesPerPage={repliesPerPage}
                        />
                      ))}

                      {comments[note.id]?.length > (visibleCommentsCount[note.id] || commentsPerPage) && (
                        <button onClick={() => handleShowMoreComments(note.id)}>Show More</button>
                      )}

                      {visibleCommentsCount[note.id] > commentsPerPage && (
                        <button onClick={() => handleShowLessComments(note.id)}>Show Less Comments</button>
                      )}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </ul>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title='Confirm Delete'
        message='Are you sure you want to delete this note? This action cannot be undone.'
      />
    </div>
  )
}
export default Posts
