import Landing from '@ui/pages/Landing'
import About from '@ui/pages/About'
import Login from '@ui/pages/Login'
import LandingPageTemplate from '@ui/templates/LandingPage.templete'
import {Route,BrowserRouter as Router, Routes} from 'react-router-dom'
function App() {
 

  return (
    <>

    <div>
      <Router>
        <Routes>
        <Route path='' element={<LandingPageTemplate /> }>
        <Route path='' element={<Landing />}/>
        </Route>
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App
