import React from 'react'
import {useState} from 'react'
import LeftSidebar from '../organism/LeftSidebar'
import Navbar from '../organism/Navbar'
import RightSidebar from '../organism/RightSidebar'
import RightSidebarDown from '../organism/RightSidebarDown'
import SettingOrganism from '../organism/SettingOrganism'


export default function Settings() {
  const [refreshPosts,setRefreshPosts] = useState(0)
  const [testId,setTestId] = useState<string | null>(null)
  const [senderDetails,setSenderDetails]=useState<any>(null)
  const [ notiService, setNotiService]= useState<any>(null)

  const handlePostAdded = ()=>{
    setRefreshPosts((prev)=>prev=1)
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
        <SettingOrganism />
        <div className='flex-col'>
          <RightSidebar setTestId={handleSetTestId} />
          <RightSidebarDown onPostAdded={handlePostAdded} />
        </div>
      </div>
      </div>
    </>
  )
}
