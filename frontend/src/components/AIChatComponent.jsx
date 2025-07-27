import React,{useEffect,useState} from 'react'
import AIHeader from './AIHeader'
import AIMessages from './AIMessages'
import AIMessageInput from './AIMessageInput'
import { useAIStore } from '../store/useAIStore.js'
import {toast} from 'react-hot-toast'
const AIChatComponent = () => {
  const [messageText, setMessageText] = useState('');
  const {sendQuerytoAI} = useAIStore();
  const handleSuggestionClick=async(input)=>{
    try{
    await sendQuerytoAI(input);
    }
    catch(err){
      console.error("Error sending suggestion:", err);
     toast.error("Failed to send suggestion. Please try again.");
    }
  }
  return ( 
    <div className="flex-1 flex flex-col overflow-auto bg-messagebg">
      <AIHeader />
       <AIMessages onSuggestionClick={handleSuggestionClick} />
      <AIMessageInput messageText={messageText} setMessageText={setMessageText} />
    </div>  
  )
}

export default AIChatComponent