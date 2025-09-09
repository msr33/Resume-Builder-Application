import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import App from './BottomHomePage.jsx'
import SignUp from './SignUp.jsx'
import HomePage from './HomePage.jsx'
import CreateResume from './CreateResume.jsx'
import ShowResume from './ShowResume.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HomePage />
  </StrictMode>,
)
