import React from 'react'
import AddPost from '../molecules/AddPost'
interface RightSidebarDownProps {
  onPostAdded: () => void;
}
const RightSidebarDown: React.FC<RightSidebarDownProps> = ({ onPostAdded }) => {
  return (
   
    <div className='m-[10px] p-6  bg-white sticky top-0 z-10 rounded-md shadow-md'>
    <div className='ml-5 mt-1 flex flex-col items-start'>
        <p className='ml-20 font-poppins text-red-700 text-base'>Share your thoughts.</p>
        <AddPost onPostAdded={onPostAdded} />
        </div>
</div>
  )
}
export default RightSidebarDown;

