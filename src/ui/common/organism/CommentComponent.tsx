import { RiCornerRightDownFill } from "react-icons/ri";
import { Comment } from "./Posts";
import InputField from "../atoms/InputField";
import Button from "../atoms/Button";
import { IoClose } from "react-icons/io5";

const CommentComponent: React.FC<{
  noteId: string;
  comment: Comment;
  handleReplySubmit: (e: React.FormEvent<HTMLFormElement>, noteId: string, commentId: string) => void;
  handleReplyChange: (noteId: string, commentId: string, value: string) => void;
  visibleReplyForm: { [key: string]: string };
  replyForm: { [key: string]: { [key: string]: string } };
  toggleReplyFormVisibility: (noteId: string, commentId: string) => void;
  handleShowMoreReplies: (noteId: string, commentId: string) => void;
  handleShowLessReplies: (noteId: string, commentId: string) => void;
  visibleRepliesCount: Record<string, number>;
  repliesPerPage: number;
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
  const replyCountKey = `${noteId}_${comment.id}`;
  const visibleCount = visibleRepliesCount[replyCountKey] || repliesPerPage;

  return (
    <div key={comment.id} className="ml-10">
      <div>
        <p>{comment?.user?.details.first_name}</p>
        {comment?.user?.details?.profileImage?.map((img)=>(
          <img
          key={img?.id}
          src={img?.path}
          alt={`Profile ${img?.id}`}
          className='w-96 h-96 rounded-full object-cover'
        />
        ))}
        <p className="font-poppins font-bold flex">
          {comment.comment}
          <RiCornerRightDownFill />
        </p>
      </div>
      <button onClick={() => toggleReplyFormVisibility(noteId, comment.id)}>
        <p>{visibleReplyForm[noteId] === comment.id ? <IoClose /> : 'Reply'}</p>
      </button>
      {visibleReplyForm[noteId] === comment.id && (
        <form onSubmit={(e) => handleReplySubmit(e, noteId, comment.id)}>
          <div className="flex">
            <InputField
              name="comment"
              type="text"
              placeholder="Add a reply"
              onChange={(e) => handleReplyChange(noteId, comment.id, e.target.value)}
              value={replyForm[noteId]?.[comment.id] || ''}
            />
            <Button type="submit" buttonText="Submit" />
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
        <button onClick={() => handleShowMoreReplies(noteId, comment.id)}>Show More Replies</button>
      )}

      {visibleCount > repliesPerPage && (
        <button onClick={() => handleShowLessReplies(noteId, comment.id)}>Show Less Replies</button>
      )}
    </div>
  );
};
export default CommentComponent;
