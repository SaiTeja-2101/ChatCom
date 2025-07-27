
import React from 'react';
import  {useChatStore}  from "../store/useChatStore.js";
import ChatContainer from "../components/ChatContainer";
import Sidebar from "../components/Sidebar";
import NoChatSelected from '../components/NoChatSelected.jsx';
import AIChatComponent from '../components/AIChatComponent.jsx';
const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
     <div className='h-screen dark:bg-darkBackground bg-background'>
      <div className="flex items-center justify-center pt-20 px-4">
        <div className='bg-white dark:bg-background rounded-lg shadow-cl w-full max-w-7xl h-[calc(100vh-6rem)]'>
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>
        </div>
      </div>
     </div>
  );
};
export default HomePage;