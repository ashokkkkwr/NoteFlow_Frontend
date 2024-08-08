import AddFriend from '../molecules/AddFriend';

export default function RightSidebar() {
  return (
    <div className='m-[10px] p-4 bg-white sticky top-0 z-10 rounded-md shadow-md w-[470px]'> {/* Set a fixed width for the sidebar */}
      <div className='mt-1 flex flex-col items-start'>
        <p className='ml-20 font-poppins text-red-700 text-base'>People you may know</p>
        <AddFriend />
      </div>
    </div>
  );
}
