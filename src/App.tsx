import Landing from '@ui/pages/Landing'
import About from '@ui/pages/About'
import Login from '@ui/pages/Login'
import LandingPageTemplate from '@ui/landingPage/templates/LandingPage.templete'
import {RouterProvider, createBrowserRouter} from 'react-router-dom'
import NoteState from 'context/NoteState'
const router = createBrowserRouter([
  //landing page
  {
    path:'/',
    element:<LandingPageTemplate />,
    children:[{index:true,element:<Landing />}],
  }
 ])
function App() {

 
return <NoteState><RouterProvider router={router} /></NoteState>

  
}

export default App
