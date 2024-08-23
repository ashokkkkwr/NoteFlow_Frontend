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


export default function AddFriends() {
  const [users, setUsers] = useState<User[]>([])
  const viewUsers = async () => {

    try {
      const response = await axiosInstance.get('/friend/view-user')

      console.log(response.data.data, 'response')

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
      {
        users.map(user => (
          <li key={user.id}>
            <p>{user.id}</p>
            <p>{user.details.first_name}</p>
            <p>{user.details.last_name}</p>
            <button onClick={() => addFriend(user.id)}>Add Friend</button>

          </li>
        ))
      }

    </div>
  )
}
