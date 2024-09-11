import LanguageState from '@context/Language/LanguageState.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import ThemeState from '@context/theme/ThemeState.tsx'
// import UserState from '@context/User/UserState.tsx'


ReactDOM.createRoot(document.getElementById('root')!).render(
//   <UserState>
  <ThemeState>
  <LanguageState>
      <App />
  </LanguageState>
  </ThemeState>
    //   {/* </UserState> */}

)
