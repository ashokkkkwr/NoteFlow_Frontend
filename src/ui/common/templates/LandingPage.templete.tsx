import { Outlet } from 'react-router-dom'

const LandingPageTemplate= ()=>{
    return(
        <>
       <div className='bg-gray-200 '>

      
        <Outlet />
        </div>
        
        </>
    )
}
export default LandingPageTemplate
