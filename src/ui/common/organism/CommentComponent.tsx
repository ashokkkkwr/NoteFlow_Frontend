import { RiCornerRightDownFill } from 'react-icons/ri'
import { Comment } from './Posts'
import InputField from '../atoms/InputField'
import Button from '../atoms/Button'
import { IoClose } from 'react-icons/io5'
import { BsFillSendFill } from 'react-icons/bs'

const CommentComponent: React.FC<{
  noteId: string
  comment: Comment
  handleReplySubmit: (e: React.FormEvent<HTMLFormElement>, noteId: string, commentId: string) => void
  handleReplyChange: (noteId: string, commentId: string, value: string) => void
  visibleReplyForm: { [key: string]: string }
  replyForm: { [key: string]: { [key: string]: string } }
  toggleReplyFormVisibility: (noteId: string, commentId: string) => void
  handleShowMoreReplies: (noteId: string, commentId: string) => void
  handleShowLessReplies: (noteId: string, commentId: string) => void
  visibleRepliesCount: Record<string, number>
  repliesPerPage: number
}> = ({
  noteId,
  comment,
  handleReplySubmit,
  handleReplyChange,
  visibleReplyForm,
  replyForm,
  toggleReplyFormVisibility,
  handleShowMoreReplies,
  handleShowLessReplies,
  visibleRepliesCount,
  repliesPerPage,
}) => {
  const replyCountKey = `${noteId}_${comment.id}`
  const visibleCount = visibleRepliesCount[replyCountKey] || repliesPerPage

  return (
    <div key={comment.id} className='ml-[5vh] mt-3'>
      <div>
        <div className='flex'>
          {comment?.user?.details?.profileImage?.map((img) => (
            <img
              key={img?.id}
              src={img?.path}
              alt={`Profile ${img?.id}`}
              className='w-8 h-8 rounded-full object-cover'
            />
          ))}
          <p className='font-poppins font-bold ml-2 mt-1'>{comment?.user?.details.first_name}</p>
        </div>
        <div className=' w-96 overflow-hidden'>
          <p className='ml- break-words whitespace-normal'>{comment.comment}</p>
        </div>
      </div>
      <button
        onClick={() => toggleReplyFormVisibility(noteId, comment.id)}
        className='flex items-center justify-center px-2 py- border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 hover:border-gray-400 transition duration-200'
      >
        <p className='flex items-center text-gray-700 font-medium'>
          {visibleReplyForm[noteId] === comment.id ? <IoClose className='text-lg' /> : 'Reply'}
        </p>
      </button>

      {visibleReplyForm[noteId] === comment.id && (
        <form onSubmit={(e) => handleReplySubmit(e, noteId, comment.id)}>
          <div className='flex relative'>
            <input
              name='comment'
              className='h-9 w-full max-w-[calc(100%-3rem)] border-2 border-gray-300 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-500 placeholder-opacity-75'
              type='text'
              placeholder='Add a reply'
              onChange={(e) => handleReplyChange(noteId, comment.id, e.target.value)}
              value={replyForm[noteId]?.[comment.id] || ''}
            />
            <button type='submit' className='absolute right-16 top-5 transform -translate-y-1/2'>
              <BsFillSendFill className='text-xl text-red-500' />
            </button>
          </div>
        </form>
      )}

      {comment.replies.slice(0, visibleCount).map((reply) => (
        <CommentComponent
          key={reply.id}
          noteId={noteId}
          comment={reply}
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

      {comment.replies.length > visibleCount && (
        <button
          className='ml-[5vh] mt-1 flex items-center justify-center  px-1 py-1 border border-red-300 rounded-lg shadow-sm bg-red-50 hover:bg-red-200 hover:border-red-600 transition duration-200'
          onClick={() => handleShowMoreReplies(noteId, comment.id)}
        >
          More Replies
        </button>
      )}

      {/* {visibleCount > repliesPerPage && (
        <button onClick={() => handleShowLessReplies(noteId, comment.id)}>Less Replies</button>
      )} */}
    </div>
  )
}
export default CommentComponent
