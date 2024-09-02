import { useContext, useEffect, useState } from 'react'
import noteContext from 'context/NoteContext'
import Posts from '../organism/Posts'
import LeftSidebar from '../organism/LeftSidebar'
import Navbar from '@ui/common/organism/Navbar'
import RightSidebar from '../organism/RightSidebar'
import RightSidebarDown from '../organism/RightSidebarDown'
import Profiles from '../organism/Profiles'
import LoggedInUserPosts from '../organism/LoggedInUserPosts'

const Profile = () => {
  const [refreshPosts, setRefreshPosts] = useState(0)
  const [testId, setTestId] = useState<string | null>(null)
  const [senderDetails, setSenderDetails] = useState<any>(null)
  const [notiService, setNotiService] = useState<any>(null)

  const handlePostAdded = () => {
    setRefreshPosts((prev) => prev + 1)
  }

  const handleSetTestId = (id: string | null, senderDetails: any, notiService: any) => {
    console.log('Test ID:', id)
    console.log('Sender Details:', senderDetails)
    setTestId(id)
    setSenderDetails(senderDetails)
    setNotiService(notiService)
  }
  return (
    <>
      <div className='bg-warmGray-200'>
        <div className='sticky top-0 z-50'>
          <Navbar testId={testId || ''} senderDetails={senderDetails} notiService={notiService} />
        </div>
        <div className='flex justify-between'>
          <LeftSidebar />

          <div className='flex flex-col justify-center items-center'>
              <Profiles />
              <LoggedInUserPosts />
                           </div>
              <div className='flex-col'>
              <RightSidebar setTestId={handleSetTestId} />
              <RightSidebarDown onPostAdded={handlePostAdded} />
            </div>
          </div>
        </div>
   
    </>
  )
}
export default Profile
