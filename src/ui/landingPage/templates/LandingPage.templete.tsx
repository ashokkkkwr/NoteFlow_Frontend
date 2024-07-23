import Navbar from '@ui/common/organism/Navbar'
import { Outlet } from 'react-router-dom'

const LandingPageTemplate= ()=>{
    return(
        <>
        <Navbar />
        <Outlet />
        </>
    )
}
export default LandingPageTemplate
