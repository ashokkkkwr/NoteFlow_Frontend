import Landing from '@ui/landingPage/pages/Landing'
import LandingPageTemplate from '@ui/landingPage/templates/LandingPage.templete'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import NoteState from 'context/NoteState'
import Signup from '@ui/user/pages/Signup'
import AuthTemplete from '@ui/user/templates/AuthTemplete'
const router = createBrowserRouter([
  //landing page
  {
    path:'/',
    element:<LandingPageTemplate />,
    children:[{index:true,element:<Landing />}],
  },{
    path:'/auth',
    element:<AuthTemplete />,
    children:[
      {path:'/auth/user',element:<Signup />}
    ]
  }
 ])
function App() {

 
return <NoteState><RouterProvider router={router} /></NoteState>

  
}

export default App
