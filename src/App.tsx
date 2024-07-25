import Landing from '@ui/common/organism/Landing'
import LandingPageTemplate from '@ui/common/templates/LandingPage.templete'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import NoteState from 'context/NoteState'
import Signup from '@ui/common/pages/Signup'
import Login from '@ui/common/pages/Login'
import AuthTemplete from '@ui/common/templates/AuthTemplete'
import FriendRequest from '@ui/common/pages/FriendRequest'
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
      {path:'user/signup',element:<Signup />},
      {path:'user/login',element:<Login />},
      {path:'user/friend-request',element:<FriendRequest />}
    ]
  }
 ])
function App() {

 
return <NoteState><RouterProvider router={router} /></NoteState>

  
}

export default App
