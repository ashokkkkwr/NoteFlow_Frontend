import React, { useEffect, useState } from 'react';
import axiosInstance from 'services/instance';
import axios from 'axios';

interface Note {
    id: string;
    title: string;
    content: string;
    img: string;
    noteMedia: Media[];
    profileImage:Media1[];
    user:{
        id:string,
        email:string,
        details:{
            first_name:string,
            profileImage:Media[];
        }
      
        
    }
}

interface Media {
    id: string;
    path: string;
}
interface Media1 {
    id: string;
    path: string;
}
interface UserDetails{
    id:string;

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
            console.log(response.data.data,'response data');
            console.log(response,'response')
            console.log(response.data.data[1].user,'response data');

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
            {error && <p>{error}</p>}
            <ul>
                {notes.map(note => (
                    <p key={note.id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                       <p>user:{note.user.id}</p>
                       <p>Email:{note.user.email}</p>
                       <p>UserName:{note.user.details.first_name}</p>
                        <p>
                            {note.user.details.profileImage.map(media=>(
                                <p key={media.id}>
                                <p>profilePic Id=
                                    {
                                        media.id
                                    }
                                </p>
                                <img src={`${media.path}`} alt={`Profile ${media.id}`} />

                            </p>
                            ))}
                        </p>
                        <p>
                            {note.noteMedia.map(media => (
                                <p key={media.id}>
                                    <p>media=
                                        {
                                            media.id
                                        }
                                    </p>
                                    <img src={`${media.path}`} alt={`Media ${media.id}`} />

                                </p>
                            ))}
                        </p>
                    
                    </p>
                ))}
            </ul>
        </div>
    );
}
