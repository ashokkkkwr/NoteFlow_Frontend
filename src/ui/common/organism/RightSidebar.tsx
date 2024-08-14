import AddFriend from '../molecules/AddFriend';
import { useRightSidebar } from '@context/RightSidebarContext';

interface RightSideBarProps {
  setTestId: (id: string | null, senderDetails: any, notiService: any) => void;
}

const RightSidebar: React.FC<RightSideBarProps> = ({ setTestId }) => {
  const { isRightSidebarOpen } = useRightSidebar();

  return (
    <>
      <div
        className={`sticky top-[104px] ${isRightSidebarOpen ? 'block' : 'hidden'} 2xl:block  md:w-auto`}
      >
        <AddFriend setTestId={setTestId} />
      </div>
    </>
  );
};

export default RightSidebar;
