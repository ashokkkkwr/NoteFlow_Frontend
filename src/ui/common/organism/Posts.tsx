import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import axios from 'axios';

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
      last_name:string
      profileImage: Media[];
    };
  };
}

interface Media {
  id: string;
  path: string;
}
interface Media1 {
  id: string;
  path: string;
}
interface UserDetails {
  id: string;
}

export default function Posts() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get('/notes/all', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response)
      setNotes(response.data.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || 'Error fetching notes');
      } else {
        setError('Error fetching notes');
      }
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <div className="ml-20 mt-10  bg-grey">
        {error && <p>{error}</p>}
        <ul>
          {notes.map(note => (
            <div key={note.id} className="mb-20 h-auto w-auto border bg-white shadow-xl rounded-lg p-4"> {/* Added padding for content */}
              <div className="flex items-center mb-4">
                {note.user.details.profileImage.map(media => (
                  <div key={media.id}>
                    <img src={`${media.path}`} alt={`Profile ${media.id}`} className="w-12 h-12 rounded-full object-cover" />
                  </div>
                ))}
                <div className="flex ml-3">
                  <p className="mr-1"> {note.user.details.first_name}</p>
                  <p> {note.user.details.last_name}</p>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-lg font-semibold">{note.title}</h3>
                <p>{note.content}</p>
              </div>
              <div>
                {note.noteMedia.map(media => (
                  <div key={media.id} className="mb-4">
                    <img src={`${media.path}`} alt={`Media ${media.id}`} className="w-[85vh] h-[65vh]" />
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
