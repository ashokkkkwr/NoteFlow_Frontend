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
  }> = ({
    noteId,
    comment,
    handleReplySubmit,
    handleReplyChange,
    visibleReplyForm,
    replyForm,
    toggleReplyFormVisibility,
  }) => (
    <div key={comment.id} className="ml-10">
      <div>
  
      <p className='font-poppins font-bold flex'>{comment.comment}<RiCornerRightDownFill /></p></div>
      <button onClick={() => toggleReplyFormVisibility(noteId, comment.id)}>
        <p>{visibleReplyForm[noteId] === comment.id ? <IoClose /> : 'Reply'}</p>
      </button>
      {visibleReplyForm[noteId] === comment.id && (
        <form onSubmit={(e) => handleReplySubmit(e, noteId, comment.id)}>
          <div className='flex'>
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
      {comment.replies?.map((reply) => (
        <CommentComponent
          key={reply.id}
          noteId={noteId}
          comment={reply}
          handleReplySubmit={handleReplySubmit}
          handleReplyChange={handleReplyChange}
          visibleReplyForm={visibleReplyForm}
          replyForm={replyForm}
          toggleReplyFormVisibility={toggleReplyFormVisibility}
        />
      ))}
    </div>
  );
  export default CommentComponent;