import { useContext, useEffect, useState } from 'react'
import LeftSidebar from '../organism/LeftSidebar'
import Navbar from '@ui/common/organism/Navbar'
import RightSidebar from '../organism/RightSidebar'
import RightSidebarDown from '../organism/RightSidebarDown'
import ViewAllUsers from '../organism/ViewAllUsers'

const FriendRequest = () => {
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
      <div className='flex '>
        <div className=''>
          <LeftSidebar />
        </div>

        <div className='flex-grow flex flex-col'>
          <Navbar testId={testId || ''} senderDetails={senderDetails} notiService={notiService} />
          <div className='flex flex-grow'>
          <div className='flex-grow'>
              <ViewAllUsers />
            </div>
            <div className=' flex flex-col '>
              <RightSidebar setTestId={handleSetTestId} />

              <RightSidebarDown onPostAdded={handlePostAdded} />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default FriendRequest
