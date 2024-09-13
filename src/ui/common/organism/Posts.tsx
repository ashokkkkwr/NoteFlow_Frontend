import React, { useEffect, useRef, useState } from 'react'
import axiosInstance from 'services/instance'
import InputField from '../atoms/InputField'
import CommentComponent from './CommentComponent'
import { useRightSidebar } from '@context/RightSidebarContext'
import { useSidebar } from '@context/SidebarContext'
import { jwtDecode } from 'jwt-decode'
import { BsFillSendFill, BsThreeDotsVertical } from 'react-icons/bs'
import { FaChevronDown, FaChevronUp, FaKissWinkHeart, FaRegCommentDots, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import { MdBrowserUpdated } from 'react-icons/md'
import Modal from './Modal'
import { AiFillDislike, AiOutlineLike } from 'react-icons/ai'
import { BiRepost, BiSolidLike } from 'react-icons/bi'
import { FiShare2 } from 'react-icons/fi'
import { IoHeartSharp } from 'react-icons/io5'
import { GiLoveMystery } from 'react-icons/gi'
import useTheme from '@hooks/useTheme'
import { ThemeEnum } from '@type/global.types'
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
  likes: Likes[]

  comments: Comment[]
}
export interface Likes {
  id: string
  isLiked: boolean
  user: {
    id: string
    email: string
    details: {
      first_name: string
      last_name: string
      profileImage: Media[]
    }
  }
  // refresh:() => void
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
  const [likes, setLikes] = useState<boolean>(false)
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
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [visibleCommentsCount, setVisibleCommentsCount] = useState<Record<string, number>>({})
  const [visibleRepliesCount, setVisibleRepliesCount] = useState<Record<string, number>>({})
  const commentsPerPage = 1
  const repliesPerPage = 1
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null)
  const {theme}=useTheme()
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
  // const fetchLikes = async (noteId: string) => {
  //   try {
  //     const response = await axiosInstance.get(`/like/like/${noteId}`)
  //     console.log(response, 'likessssss')
  //     setLikes(response.data.data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get('/notes/all', {
        headers: { 'Content-Type': 'application/json' },
      })

      setNotes(response.data.data)

      // Extract IDs and pass them to fetchUserLike
      const ids = response.data.data.map((note: Note) => note.id)
      fetchUserLike(ids)

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
  }, [refreshPosts, loggedInUserId])

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

  // const handleButtonClick = (button: string) => {
  //   setActiveButton(activeButton === button ? null : button)
  // }
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set())
  const handleButtonClick = (noteId: string) => {
    setLikedPosts((prevLikedPosts) => {
      const updatedLikedPosts = new Set(prevLikedPosts)
      if (updatedLikedPosts.has(noteId)) {
        updatedLikedPosts.delete(noteId)
      } else {
        updatedLikedPosts.add(noteId)
      }
      return updatedLikedPosts
    })
  }
  const likePosts = async (id: string) => {
    try {
      const response = await axiosInstance.post(`/like/like/${id}`)
      setLikes((prev) => !prev)
      fetchNotes()
      console.log('🚀 ~ likePosts ~ response:', response)
    } catch (error) {
      console.log('🚀 ~ likePosts ~ error:', error)
    }
  }
  const fetchUserLike = async (ids: string) => {
    console.log('🚀 ~ fetchUserLike ~ ids:', ids)
    try {
      for (const id of ids) {
        const response = await axiosInstance.get(`/like/post-like/${id}`)

        const like = response.data.data

        const liked = like.some((like: Likes) => like.user.id === loggedInUserId)
        console.log('🚀 ~ fetchUserLike ~ liked:', liked)
        setLikes(liked) // Update state based on like status

        console.log('🚀 ~ fetchUserLike ~ response:', response)
      }
    } catch (error) {
      console.log('🚀 ~ fetchUserLike ~ error:', error)
    }
  }
  // useEffect(()=>{
  //   // console.log('yoyo')
  //   // console.log(notes)
  //   // const ids=notes.map((note)=>(
  //   //   note.id
  //   //6666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666666 ))
  //   fetchUserLike()
  // },[])
  return (
    <div
      className={`mt-2 bg-grey w-[98vh] h-[0vh]${isRightSidebarOpen ? 'hidden' : 'block'} ${
        isSidebarOpen ? 'hidden' : 'block'
      } 2xl:block overflow-auto scroll-container`}
      style={{ scrollBehavior: 'smooth' }} // Keep this CSS property
    >
      {error && <p>{error}</p>}
      <ul>
        {notes.map((note) => (
          <div key={note.id} className={`mb-2  w-auto border bg-white shadow-xl rounded-lg p-5 ${theme === ThemeEnum.dark&& 'bg-gray-800'}`}>
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
                      <p className={`mr-1 ${theme === ThemeEnum.dark&& 'text-white'}`}>{note.user.details.first_name}</p>
                      <p className={`${theme === ThemeEnum.dark&& 'text-white'}`}>{note.user.details.last_name}</p>
                    </div>
                  </div>

                  <div>
                    <p className={`mr-20 text-sm text-gray-400 ${theme === ThemeEnum.dark&& 'text-white'}`}>{getTimeDifference(note.createdAt)}</p>
                  </div>

                  <div className='relative'>
                    <div className='flex items-end mr-5 ' onClick={() => toggleDropdown(note.id)}>
                      {loggedInUserId === note.user.id && <BsThreeDotsVertical className={`text-xl ${theme === ThemeEnum.dark&& 'text-white'}`} />}
                      {openDropdownId === note.id && (
                        <div
                          ref={dropdownRef}
                          className={`absolute right-0 top-10 mt-2 w-48 bg-white rounded-md shadow-2xl z-50 ${theme === ThemeEnum.dark&& 'bg-gray-900'}`}
                        >
                          <ul>
                            <li className={`p-2 hover:bg-gray-200 cursor-pointer ${theme === ThemeEnum.dark&& 'text-white'}`}  onClick={() => toggleForm(note.id)}>
                              Edit
                            </li>
                            {/* <li className='p-2 hover:bg-gray-200 cursor-pointer' onClick={() => handleDelete(note.id)}> */}
                            <li className={`p-2 hover:bg-gray-200 cursor-pointer ${theme === ThemeEnum.dark&& 'text-white'}`} onClick={() => toggleDelete(note.id)}>
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className='mb-4 '>
                  <h3 className={`text-lg font-semibold mt-10 ${theme === ThemeEnum.dark&& 'text-white'}`}>{note.title}</h3>
                  <p className={`${theme === ThemeEnum.dark&& 'text-white'}`}>{note.content}</p>
                </div>
                <div className='flex justify-center items-center'>
                  {note.noteMedia.map((media) => (
                    <div key={media.id} className='mb-4'>
                      <img src={media.path} alt={`Media ${media.id}`} className='w-[85vh] h-[65vh] object-contain' />
                    </div>
                  ))}
                </div>
                {/**
                 * Total Like and Comments sections.
                 */}
                <div className='flex justify-between pt-5 px-28'>
                  <div className='flex text-red-500'>
                    <BiSolidLike />
                    <IoHeartSharp />
                    <FaKissWinkHeart />
                    <p className='text-sm'>{note.likes.length}</p>
                  </div>
                  <div>
                    <p className={`text-sm ${theme === ThemeEnum.dark&& 'text-white'}`}>150 comments</p>
                  </div>
                </div>
                {/**
                 * Like comments share section
                 */}
                <div className='flex justify-between px-28 pt-5 pb-5 border-t-2   w-[85vh] ml-24'>
                  <div
                    className=' hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out px-1 rounded'
                    onClick={() => likePosts(note.id)}
                  >
                    {/* // className={`flex items-center cursor-pointer ${
                    //   likedPosts.has(note.id) ? 'text-red-500' : ''
                    // } hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out p-2 rounded`}
                    // nClick={() => handleButtonClick(note.id)}
                   */}

                    {/* onClick={() => toggleDelete(note.id)} */}
                    <button className='mt-2 flex text-base font-myriad font-semibold'>
                      {note.likes.some((user) => user.user.id === loggedInUserId) ? (
                        <p className='flex text-base font-myriad font-semibold text-red-500 hover:text-white'>
                          {' '}
                          <GiLoveMystery className='text-2xl mr-2' />
                          Like
                        </p>
                      ) : (
                        <p className={`flex text-base font-myriad font-semibold ${theme === ThemeEnum.dark&& 'text-white'}`}>
                          {' '}
                          <GiLoveMystery className={`text-2xl mr-2 ${theme === ThemeEnum.dark&& 'text-white'}` }/>
                          Like
                        </p>
                      )}
                    </button>
                  </div>
                  <div>
                    <button onClick={() => handlePostSelect(note.id)}>
                      {selectedPostId === note.id ? (
                        <div className='text-red-500 hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out p-2 rounded'>
                          Hide Comments
                        </div>
                      ) : (
                        <div className='flex items-center cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out p-2 rounded'>
                          <FaRegCommentDots className={`text-xl mr-2 ${theme === ThemeEnum.dark&& 'text-white'}`} />
                          <span className={`text-base font-myriad font-semibold ${theme === ThemeEnum.dark&& 'text-white'}`}>Comment</span>
                        </div>
                      )}
                    </button>
                  </div>

                  <div>
                    <p className='flex items-center cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out p-2 rounded'>
                      <BiRepost className={`text-3xl mr-1 ${theme === ThemeEnum.dark&& 'text-white'}`} />
                      <span className={`text-base font-myriad font-semibold ${theme === ThemeEnum.dark&& 'text-white'}`}>Repost</span>
                    </p>
                  </div>

                  <div>
                    <p className='flex items-center cursor-pointer hover:bg-red-500 hover:text-white transition-colors duration-300 ease-in-out p-2 rounded'>
                      <FiShare2 className={`text-xl mr-2 ${theme === ThemeEnum.dark&& 'text-white'}`} />
                      <span className={`text-base font-myriad font-semibold ${theme === ThemeEnum.dark&& 'text-white'}`}>Share</span>
                    </p>
                  </div>
                </div>

                {selectedPostId === note.id && (
                  <div className='p-5 bg-gray-100 rounded-xl w-[85vh] ml-[10vh]'>
                    <button onClick={() => toggleCommentFormVisibility(note.id)}>
                      {/* {visibleCommentForm === note.id ? 'Cancel' : 'Add a comment'} */}
                    </button>
                    {/* {visibleCommentForm === note.id && ( */}
                    <form onSubmit={(e) => handleTopLevelCommentSubmit(e, note.id)}>
                      <div className='relative'>
                        <input
                          name='comment'
                          className='h-12 w-full border-2 border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-gray-400 placeholder-gray-500 placeholder-opacity-75'
                          type='text'
                          placeholder='Add a comment'
                          onChange={(e) => handleTopLevelCommentChange(note.id, e.target.value)}
                          value={topLevelCommentForm[note.id] || ''}
                        />
                        <button type='submit' className='absolute right-5 top-3 '>
                          <BsFillSendFill className='text-2xl text-red-500' />
                        </button>
                      </div>
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
                        <button
                          className='flex items-center justify-center mt-2 px-4 py-1 border border-red-400 rounded-lg shadow-sm bg-red-100 hover:bg-red-200 hover:border-red-600 transition duration-200'
                          onClick={() => handleShowMoreComments(note.id)}
                        >
                          <FaChevronDown className='mr-2 text-gray-700 text-lg hover:text-black' />
                          <p className='text-gray-700 font-medium'>Show More</p>
                        </button>
                      )}

                      {/* {visibleCommentsCount[note.id] > commentsPerPage && (
                        <button onClick={() => handleShowLessComments(note.id)}><FaChevronUp />
Show Less Comments</button>
                      )} */}
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
