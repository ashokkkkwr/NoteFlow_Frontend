
import Nav from '../molecules/Nav'
interface Props{
  testId:string | null,
  senderDetails:any
}
  const Navbar:React.FC<Props> = ({testId,senderDetails}) =>{ 
  return (
    <div className='flex   bg-white p-4 ml-[1px] justify-end sticky top-0 z-10 rounded-lg shadow-md'>
< Nav testId={testId} senderDetails={senderDetails}/>
{/* <LanguageToggle /> */}
    </div>
  )
}
export default Navbar
