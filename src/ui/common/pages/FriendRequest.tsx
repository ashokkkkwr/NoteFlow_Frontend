import React, { useEffect, useState } from 'react'
import axiosInstance from 'services/instance'

interface Friends {
    id: string,
    createdAt: any,
    sender: {
        details: {
            first_name: string,
            last_name: string,
            profileImage: Media[]

        }
    }

}
interface Media {
    id: string;
    path: string;
}
export default function FriendRequest() {
    
    const [request, setRequest] = useState<Friends[]>([])
    const friendRequest = async () => {

        try {
            const response = await axiosInstance.get('/friend')


            setRequest(response.data.data)
            console.log(response.data.data, "set Request")
        } catch (error) {

        }
    }
    const acceptRequest = async (id:string)=>{
        try{
            const response = await axiosInstance.patch(`/friend/accept-request/${id}`)
                console.log(response.data, "Request Accepted")
            }catch(error){
                console.log(error)
            }
    }
    useEffect(() => {
        friendRequest()
    }, [])
    return (
        <div>

            {request.map(friends => (
                <li key={friends.id}>
                    <p>{friends.id}</p>
                    <p>{friends.sender.details.first_name}</p>
                    <p>{friends.sender.details.last_name}</p>
                    {friends.sender.details.last_name}
                    <div>
                        {
                            friends.sender.details.profileImage.map(media => (
                                <div key={media.id}>
                                    <p>profilePic Id={media.id}</p>
                                    <p>{media.path} path</p>
                                    <img src={`${media.path}`} alt={`Profile ${media.id}`} />

                                </div>
                            ))
                        }
                    </div>
                    <button onClick={()=>acceptRequest(friends.id)}>Accept Request</button>
                </li>
            ))}


        </div>
    )
}
