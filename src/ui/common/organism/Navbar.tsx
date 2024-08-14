import { useSidebar } from '@context/SidebarContext'
import Nav from '../molecules/Nav'
interface Props {
  testId: string | null
  senderDetails: any
  notiService: any
}
const Navbar: React.FC<Props> = ({ testId, senderDetails, notiService }) => {
  const { toggleSidebar } = useSidebar()
  return (
    <div className='flex   bg-white p-4 ml-[1px] justify-end sticky top-0 z-10 rounded-lg shadow-md'>
      <button onClick={toggleSidebar} className='block md:hidden'>
        Toggle Sidebar
      </button>
      <Nav testId={testId} senderDetails={senderDetails} notiService={notiService} />
      {/* <LanguageToggle /> */}
    </div>
  )
}
export default Navbar
