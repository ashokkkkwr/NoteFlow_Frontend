import React, { useEffect, useState } from 'react'
import axiosInstance from 'services/instance'
interface User {
  id: string,
  details: {
    first_name: string,
    last_name: string,
    profileImage: Media[]
  }


}
interface Media {
  id: string;
  path: string;
}


export default function AddFriend() {
  const [users, setUsers] = useState<User[]>([])
  const viewUsers = async () => {

    try {
      const response = await axiosInstance.get('/friend/view-user')

      console.log(response.data.data, 'response all friends')

      setUsers(response.data.data)


    } catch (error) {

      console.log(error)
    }

  }
  const addFriend = async (id: string) => {
    try {
      console.log(id, 'user ko id')
      const response = await axiosInstance.post(`/friend/${id}`)
      console.log(response.data, "Request added")
      setUsers(prevRequests => prevRequests.filter(request => request.id !== id))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    viewUsers()
  }, [])
  return (

    <div>
       <div className=''>
  <p className=' text-red-500 text-lg'>People you may know</p>
  </div>  

      {
        users.map(user => (
          <div key={user.id}>
 <div className='flex'>
            <div>
            {user.details.profileImage.map(media => (
                  <div key={media.id}>
                    <img src={`${media.path}`} alt={`Profile ${media.id}`} className="w-12 h-12 rounded-full object-cover" />
                  </div>
                ))}
                </div>
                <div className='ml-2 mt-2'>
            <p className='text-lg'>{user.details.first_name}</p>
            </div>
            <div className='ml-1 mt-2'>
            <p className='text-lg'>{user.details.last_name}</p>
            </div>
           </div>
          

            {/* <p>
                {user.details.first_name}
              </p>
              <p>
                {user.details.last_name}
              </p> */}
            <button onClick={() => addFriend(user.id)}>Add Friend</button>

          </div>
        ))
      }

    </div>
  )
}
