import { useSidebar } from '@context/SidebarContext';
import { useRightSidebar } from '@context/RightSidebarContext';
import Nav from '../molecules/Nav';
import { FiMenu, FiX } from 'react-icons/fi'; // Importing icons
import { BsArrowLeftCircleFill } from "react-icons/bs";
import useTheme from '@hooks/useTheme';
import { ThemeEnum } from '@type/global.types';

interface Props {
  testId: string | null;
  senderDetails: any;
  notiService: any;
}

const Navbar: React.FC<Props> = ({ testId, senderDetails, notiService }) => {
  const { toggleSidebar, isSidebarOpen } = useSidebar();
  const { toggleRightSidebar, isRightSidebarOpen } = useRightSidebar(); 
  const {theme } = useTheme()

  return (
<div className={`flex bg-white p-4 ml-[1px] justify-between  border rounded-lg shadow-md ${theme===ThemeEnum.dark&&'bg-gray-800'}`}>
<button onClick={toggleSidebar} className="block 2xl:hidden">
        {isSidebarOpen ? <FiX className='text-3xl text-red-500' /> : <BsArrowLeftCircleFill  className='text-3xl text-black'/>} 
      </button>
      <Nav testId={testId} senderDetails={senderDetails} notiService={notiService} />
      <button onClick={toggleRightSidebar} className="block 2xl:hidden">
        {isRightSidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />} 
      </button>
    </div>
  );
}

export default Navbar;
