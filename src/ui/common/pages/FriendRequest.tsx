import React, { useEffect, useState } from 'react'
import axiosInstance from 'services/instance'

interface Friends{
    id:string,

}
export default function FriendRequest() {
 
    const [request,setRequest]=useState<Friends[]>([])
    const FriendRequest =async ()=>{
       
        try{
            const response = await axiosInstance.get('/friend')

            console.log(response)
            setRequest(response.data.data)
            console.log(response.data.data,"set Request")
        }catch(error){
            console.log(error)
        }
    }
useEffect(()=>{
    FriendRequest()
},[])
  return (
    <div>
        
    {request.map(friends =>(
        <li key={friends.id}>
            {friends.id}
        </li>
    ))}


    </div>
  )
}
