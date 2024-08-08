import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import InputField from '../atoms/InputField';
import Button from '../atoms/Button';
import useLang from '@hooks/useLang';
import { RiCornerRightDownFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import CommentComponent from './CommentComponent';


export interface Comment {
  id: string;
  comment: string;
  replies: Comment[];
}

export interface Note {
  id: string;
  title: string;
  content: string;
  img: string;
  noteMedia: Media[];
  user: {
    id: string;
    email: string;
    details: {
      first_name: string;
      last_name: string;
      profileImage: Media[];
    };
  };
  comments: Comment[];
}

interface Media {
  id: string;
  path: string;
}
export default function Posts() {
  const { lang } = useLang();
  const [notes, setNotes] = useState<Note[]>([]);
  const [comments, setComments] = useState<Record<string, Comment[]>>({});
  const [topLevelCommentForm, setTopLevelCommentForm] = useState<{ [key: string]: string }>({});
  const [replyForm, setReplyForm] = useState<{ [key: string]: { [key: string]: string } }>({});
  const [visibleCommentForm, setVisibleCommentForm] = useState<string | null>(null);
  const [visibleReplyForm, setVisibleReplyForm] = useState<{ [key: string]: string }>({});
  const [error, setError] = useState('');

  const handleTopLevelCommentChange = (noteId: string, value: string) => {
    setTopLevelCommentForm((prev) => ({ ...prev, [noteId]: value }));
  };

  const handleReplyChange = (noteId: string, commentId: string, value: string) => {
    setReplyForm((prev) => ({
      ...prev,
      [noteId]: { ...prev[noteId], [commentId]: value },
    }));
  };

  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get('/notes/all', {
        headers: { 'Content-Type': 'application/json' },
      });
      setNotes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCommentsForNote = async (noteId: string) => {
    try {

      const response = await axiosInstance.get(`/comment/${noteId}`);
      console.log(response,'commentsss')
      setComments((prevComments) => ({ ...prevComments, [noteId]: response.data.data }));
    } catch (error) {
      console.log(error);
    }
  };
  const handleTopLevelCommentSubmit = async (e: React.FormEvent<HTMLFormElement>, noteId: string) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/comment/${noteId}`, {
        comment: topLevelCommentForm[noteId] || '',
        parentId: '',
      });
      setTopLevelCommentForm((prev) => ({ ...prev, [noteId]: '' }));
      fetchCommentsForNote(noteId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>, noteId: string, commentId: string) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/comment/${noteId}`, {
        comment: replyForm[noteId][commentId] || '',
        parentId: commentId,
      });
      setReplyForm((prev) => ({
        ...prev,
        [noteId]: { ...prev[noteId], [commentId]: '' },
      }));
      fetchCommentsForNote(noteId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [notes]);

  useEffect(() => {
    notes.forEach((note) => {
      fetchCommentsForNote(note.id);
    });
  }, []);

  const toggleCommentFormVisibility = (noteId: string) => {
    setVisibleCommentForm(visibleCommentForm === noteId ? null : noteId);
  };

  const toggleReplyFormVisibility = (noteId: string, commentId: string) => {
    setVisibleReplyForm((prev) => ({
      ...prev,
      [noteId]: prev[noteId] === commentId ? '' : commentId,
    }));
  };

  return (
    <div className="ml-36 mt-10 bg-grey">
      {error && <p>{error}</p>}
      <ul>
        {notes.map((note) => (
          <div key={note.id} className="mb-20 h-auto w-auto border bg-white shadow-xl rounded-lg p-4">
            <div className="flex items-center mb-4">
              {note.user.details.profileImage.map((media) => (
                <div key={media.id}>
                  <img src={media.path} alt={`Profile ${media.id}`} className="w-12 h-12 rounded-full object-contain" />
                </div>
              ))}
              <div className="flex ml-3">
                <p className="mr-1">{note.user.details.first_name}</p>
                <p>{note.user.details.last_name}</p>
              </div>
            </div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold">{note.title}</h3>
              <p>{note.content}</p>
            </div>
            <div>
              {note.noteMedia.map((media) => (
                <div key={media.id} className="mb-4">
                  <img src={media.path} alt={`Media ${media.id}`} className="w-[85vh] h-[65vh]" />
                </div>
              ))}
            </div>
            <div>
              <button onClick={() => toggleCommentFormVisibility(note.id)}>
                {visibleCommentForm === note.id ? 'Cancel' : 'Add a comment'}
              </button>
              {visibleCommentForm === note.id && (
                <form onSubmit={(e) => handleTopLevelCommentSubmit(e, note.id)}>
                  <InputField
                    name="comment"
                    type="text"
                    placeholder="Add a comment"
                    onChange={(e) => handleTopLevelCommentChange(note.id, e.target.value)}
                    value={topLevelCommentForm[note.id] || ''}
                  />
                  {error}
                  <Button type="submit" buttonText="Submit" />
                </form>
              )}
            </div>
            <div>
              {comments[note.id]?.map((comment) => (
                <CommentComponent
                  key={comment.id}
                  noteId={note.id}
                  comment={{ ...comment, replies: comment.replies || [] }}
                  handleReplySubmit={handleReplySubmit}
                  handleReplyChange={handleReplyChange}
                  visibleReplyForm={visibleReplyForm}
                  replyForm={replyForm}
                  toggleReplyFormVisibility={toggleReplyFormVisibility}
                />
              ))}
            </div>
          </div>
        ))}
      </ul>
    </div>
  );
}
