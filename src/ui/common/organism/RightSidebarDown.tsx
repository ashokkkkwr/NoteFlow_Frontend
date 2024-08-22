import React from 'react'
import AddPost from '../molecules/AddPost'
import { useRightSidebar } from '@context/RightSidebarContext';

interface RightSidebarDownProps {
  onPostAdded: () => void;
}
const RightSidebarDown: React.FC<RightSidebarDownProps> = ({ onPostAdded }) => {
  const { isRightSidebarOpen } = useRightSidebar();

  return (

      <>
    <div className={`sticky top-[54vh] z-10 ${isRightSidebarOpen?'block':'hidden'} 2xl:block`}>
    <AddPost onPostAdded={onPostAdded} />
      </div>
       
        </>
      
  )
}
export default RightSidebarDown;

