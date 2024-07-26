import LanguageState from '@context/Language/LanguageState.tsx'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <LanguageState>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </LanguageState>
)
