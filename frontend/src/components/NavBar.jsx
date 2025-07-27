import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { MessageCircleMore, Settings, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom'
import SettingsPage from '../pages/SettingsPage';
import { Bot } from 'lucide-react';
import { TiMessages } from "react-icons/ti";
import { useChatStore } from '../store/useChatStore.js';
const NavBar = () => {
  const { authUser, logout } = useAuthStore();
  const { setSelectedUser, selectedUser } = useChatStore();
  const handleAIChatClick = () => {
    setSelectedUser({
      _id: '507f1f77bcf86cd799439011',
      fullName: 'ChatCom AI Assistant',
      profilePic: '',
      isAI: true
    })
  }
  return (
    <header
      className="bg-navbackground fixed w-full top-0 z-40 
    backdrop-blur-lg"
    >
      <div className="container mx-auto h-16 px-4">
        <div className='flex items-center justify-between h-full'>
          <div className='flex items-center gap-8'>
            <Link to="/" className="transtition-all flex items-center gap-3 hover:opacity-80">
              <div className='size-9 rounded-lg bg-primary/10 flex items-center justify-center'>
                <TiMessages className='w-12 h-12 text-purple-500' />
              </div>

              <h1 className='text-2xl font-bold'> ChatCom</h1>
            </Link>
          </div>
          <div className="flex items-center gap-5 sm:gap-10">
                 <SettingsPage />
            {/* </div> */}
            {authUser && (
              <>
                <button onClick={handleAIChatClick} className='hover:opacity-80 gap-2 btn-sm  flex items-center bg-gradient-to-r  from-purple-500 to-blue-500 rounded-xl px-3 py-2 shadow-md hover:shadow-2xl transition-all duration-200'>
                  <Bot className='size-8 text-white' />
                  <span className="hidden sm:inline  font-bold text-xl text-center text-white">Cora</span>
                </button>
               
                <Link to="/profile" className="hover:opacity-80 gap-2 btn-sm transition-colors flex items-center">
                  <img src={authUser.profilePic || "/avatar.png"} alt="Profile" className="w-7 h-7 rounded-full object-cover" />
                  <span className="hidden sm:inline text-lg">Profile</span>
                </Link>
                <button className="hover:opacity-80 gap-2 btn-sm transition-colors flex items-center" onClick={logout}>
                  <LogOut className='size-5' />
                  <span className="hidden sm:inline text-lg">Logout</span>
                </button>
              </>
            )}
          </div>


        </div>
      </div>


    </header>
  )
}

export default NavBar