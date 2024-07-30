import React, { useEffect, useState } from 'react'
import axiosInstance from 'services/instance';
interface User {
    id: string,
    createdAt: any,

    details: {
        first_name: string,
        last_name: string,
        profileImage: Media[]

    }

    email: string

}
interface Media {
    id: string;
    path: string;
}

export default function ViewFriends() {
    const [users, setUsers] = useState<User[]>([])
    const viewUsers = async () => {

        try {
            const response = await axiosInstance.get('/friend/friends')

            console.log(response.data.data, 'Friendss')

            setUsers(response.data.data)


        } catch (error) {

            console.log(error)
        }

    }
    useEffect(() => {
        viewUsers()
    }, [])
    return (

        <div>

            
            {users.map(friends => (
                <li key={friends.id}>
                    <p>{friends.id}</p>
                    <p>{friends.email}</p>

                    <p>{friends.details.first_name}</p>
                    <p>{friends.details.last_name}</p>
                    {friends.details.last_name}
                    <div>
                        {
                            friends.details.profileImage.map(media => (
                                <div key={media.id}>
                                    <p>profilePic Id={media.id}</p>
                                    <p>{media.path} path</p>
                                    <img src={`${media.path}`} alt={`Profile ${media.id}`} />

                                </div>
                            ))
                        }
                    </div>
                </li>
            ))}

        </div>
    )
}
