
import Nav from '../molecules/Nav'
interface Props{
  testId:string | null
}
  const Navbar:React.FC<Props> = ({testId}) =>{
  
  
  return (
    <div className='flex   bg-white p-4 ml-[1px] justify-end sticky top-0 z-10 rounded-lg shadow-md'>
 



< Nav testId={testId}/>
{/* <LanguageToggle /> */}
    </div>
  )
}
export default Navbar
