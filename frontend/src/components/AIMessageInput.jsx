import React,{useState,useEffect} from 'react'
import { Bot, Send } from 'lucide-react';
import { useAIStore } from '../store/useAIStore.js';
const AIMessageInput = ({messageText,setMessageText}) => {
  const { sendQuerytoAI, isLoading } = useAIStore();
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageText.trim() || isLoading) return

    const text = messageText
    setMessageText('')
    
    try {
      await sendQuerytoAI(text)
    } catch (error) {
      setMessageText(text) // Restore message if failed
    }
  }

  return (
     <div className="p-2 w-full">
      <form onSubmit={handleSendMessage} className="p-2 border-base-300 bg-transparent">
        <div className="flex items-center gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              className="input input-bordered w-full pr-12 rounded-xl shadow-sm focus:shadow-md transition-shadow p-6 text-lg bg-darklayer1"
              placeholder="Ask Cora anything..."
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            className="btn btn-circle bg-gradient-to-r from-purple-500 to-blue-500 border-0 text-white hover:from-purple-600 hover:to-blue-600 shadow-md hover:shadow-lg transition-all p-2"
            disabled={!messageText.trim() || isLoading}
          >
            <Send size={20} />
             </button>
        </div>
      </form>
     </div>
    
  )
}

export default AIMessageInput