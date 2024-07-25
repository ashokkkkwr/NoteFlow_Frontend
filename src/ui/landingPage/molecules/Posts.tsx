import React, { useEffect, useState } from 'react'
import axiosInstance from 'services/instance'
interface Note {
    id: string;
    content: string;
}
export default function Posts() {
    const [note, setNote] = useState<Note[]>([])
    const [error, setError] = useState(null)
    const notes = async () => {
        try {
            const Response = await axiosInstance.get('/notes/all', {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            console.log(Response?.data.data)
            setNote(Response?.data.data)
        } catch (error) {

        }
    }
    useEffect(() => {
        notes();
    }, [])
    return (


        <div>

            {
                <ul>
                    {note.map(note => (
                        <li key={note.id}>{note.content}</li>
                    ))}
                </ul>
            }
        </div>
    )
}
