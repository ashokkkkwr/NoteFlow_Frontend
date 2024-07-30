
import LanguageToggle from '../molecules/LanguageToggle'
import Logo from '../molecules/Logo'
import useLang from '@hooks/useLang'
import Nav from '../molecules/Nav'

  const Navbar = () =>{
  
  
  return (
    <div className='flex   bg-white p-4 ml-[1px] justify-end sticky top-0 z-10 rounded-lg shadow-md'>
 



< Nav />
{/* <LanguageToggle /> */}
    </div>
  )
}
export default Navbar
