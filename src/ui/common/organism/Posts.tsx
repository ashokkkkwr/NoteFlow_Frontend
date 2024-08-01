import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import Label from '../atoms/Lable';
import InputField from '../atoms/InputField';
import { authLabel } from '@data/localization/common/auth';
import useLang from '@hooks/useLang';
import { postLabel } from '@data/localization/common/landingPage/sharePost';
import Button from '../atoms/Button';

interface Comment {
  id: string;
  comment: string;
  replies: Comment[]; // Recursive type for nested comments
}

interface Note {
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
  const [error, setError] = useState('');

  // Handle input change for top-level comments
  const handleTopLevelCommentChange = (noteId: string, value: string) => {
    setTopLevelCommentForm(prev => ({
      ...prev,
      [noteId]: value,
    }));
  };

  // Handle input change for replies
  const handleReplyChange = (noteId: string, commentId: string, value: string) => {
    setReplyForm(prev => ({
      ...prev,
      [noteId]: {
        ...prev[noteId],
        [commentId]: value,
      },
    }));
  };

  // Fetch notes from the server
  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get('/notes/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setNotes(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch comments for a specific note
  const fetchCommentsForNote = async (noteId: string) => {
    try {
      const response = await axiosInstance.get(`/comment/${noteId}`);
      setComments(prevComments => ({
        ...prevComments,
        [noteId]: response.data.data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  // Submit top-level comment
  const handleTopLevelCommentSubmit = async (e: React.FormEvent<HTMLFormElement>, noteId: string) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/comment/${noteId}`, {
        comment: topLevelCommentForm[noteId] || '',
        parentId: '', 
      });
      console.log(response);
      setTopLevelCommentForm(prev => ({
        ...prev,
        [noteId]: '',
      }));
      fetchCommentsForNote(noteId);
    } catch (error) {
      console.log(error);
    }
  };

  // Submit reply to a comment
  const handleReplySubmit = async (e: React.FormEvent<HTMLFormElement>, noteId: string, commentId: string) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(`/comment/${noteId}`, {
        comment: replyForm[noteId][commentId] || '',
        parentId: commentId,
      });
      console.log(response);
      setReplyForm(prev => ({
        ...prev,
        [noteId]: {
          ...prev[noteId],
          [commentId]: '',
        },
      }));
      fetchCommentsForNote(noteId);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    notes.forEach(note => {
      fetchCommentsForNote(note.id);
    });
  }, [notes]);

  return (
    <div>
      <div className="ml-36 mt-10 bg-grey">
        {error && <p>{error}</p>}
        <ul>
          {notes.map(note => (
            <div key={note.id} className="mb-20 h-auto w-auto border bg-white shadow-xl rounded-lg p-4">
              <div className="flex items-center mb-4">
                {note.user.details.profileImage.map(media => (
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
                {note.noteMedia.map(media => (
                  <div key={media.id} className="mb-4">
                    <img src={media.path} alt={`Media ${media.id}`} className="w-[85vh] h-[65vh]" />
                  </div>
                ))}
              </div>
              <div>
                <form onSubmit={(e) => handleTopLevelCommentSubmit(e, note.id)}>
                  <div>
                    <Label name={'comment'} label={postLabel.comment[lang]} />
                    <InputField
                      name={'comment'}
                      type={'text'}
                      placeholder={authLabel.enterYourEmail[lang]}
                      onChange={(e) => handleTopLevelCommentChange(note.id, e.target.value)}
                      value={topLevelCommentForm[note.id] || ''}
                    />
                    {error}
                    <Button type={'submit'} buttonText={"submit"} />
                  </div>
                </form>
              </div>
              <div>
                {comments[note.id]?.map(comment => (
                  <div key={comment.id}>
                    <div>{comment.comment}</div>
                    {comment.replies.map(reply => (
                      <div key={reply.id} className='ml-10'>
                        {reply.comment}
                      </div>
                    ))}
                    <form onSubmit={(e) => handleReplySubmit(e, note.id, comment.id)}>
                      <div>
                        <Label name={'comment'} label={postLabel.comment[lang]} />
                        <InputField
                          name={'comment'}
                          type={'text'}
                          placeholder={authLabel.enterYourEmail[lang]}
                          onChange={(e) => handleReplyChange(note.id, comment.id, e.target.value)}
                          value={replyForm[note.id]?.[comment.id] || ''}
                        />
                        {error}
                        <Button type={'submit'} buttonText={"submit"} />
                      </div>
                    </form>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
