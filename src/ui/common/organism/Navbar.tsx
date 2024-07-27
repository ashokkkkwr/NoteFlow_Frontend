
import LanguageToggle from '../molecules/LanguageToggle'
import Logo from '../molecules/Logo'
import useLang from '@hooks/useLang'
import Nav from '../molecules/Nav'

  const Navbar = () =>{
  
  
  return (
    <div className='flex gap-4'>
    < Logo />


<LanguageToggle />
< Nav />
    </div>
  )
}
export default Navbar
