import React from 'react'
import NavBar from './components/NavBar.jsx'
import {Routes,Route, Navigate} from 'react-router-dom'
import  HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import TestDaisyUI from './pages/TestDaisyUI.jsx'
import { axiosInstance } from './lib/axios.js'
import {useAuthStore} from './store/useAuthStore.js'
import { useEffect } from 'react'
import { Loader } from 'lucide-react';
import {Toaster} from 'react-hot-toast';
import '../styles/themes.css'
const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
  useEffect(()=>{
    checkAuth()
  },[checkAuth])
 
  console.log("Auth User: ",authUser)
  console.log("Online Users: ",onlineUsers)
  if(isCheckingAuth && !authUser){
    return (
      <div className='flex justify-center items-center h-screen'>
        <Loader className='animate-spin text-[#DCD6F7]' size={48} />
      </div>
    )
  }
  return (
    <>
     <div >
       <NavBar />
     <Routes>
      <Route path='/' element={authUser? <HomePage/> :<Navigate to="/login" />} />
      <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
      <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
      <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      {/* <Route path="/settings" element={<SettingsPage />} /> */}
     </Routes>
      <Toaster/>
   </div>

    </>
  )
}

export default App