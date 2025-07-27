import React,{useRef,useEffect,useState}from 'react'
import { useAIStore } from '../store/useAIStore.js'
import { useAuthStore } from '../store/useAuthStore.js';
import formatMessageTime from '../lib/utils.js';
import { Bot, Sparkles } from 'lucide-react';
const AI_USER_ID = '507f1f77bcf86cd799439011';
const AIMessages = ({ onSuggestionClick }) => {
  const { messages,isLoading,getPreviousMessages} = useAIStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  useEffect(() => {
    getPreviousMessages()
  }, [])

  useEffect(()=>{
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <div className="size-20 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-4">
              <Bot className="size-10 text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2">Welcome to Cora!</h3>
            <p className="text-base-content/70 max-w-md mx-auto">
              I'm your virtual assistant. Ask me anything - from coding help to creative writing, I'm here to assist you!
            </p>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
              <button 
                onClick={() => onSuggestionClick("What can you help me with?")}
                className="p-3 bg-base-200 rounded-lg text-sm hover:bg-base-300 transition-colors"
              >
                💡 What can you help me with?
              </button>
              <button 
                onClick={() => onSuggestionClick("Write a creative story")}
                className="p-3 bg-base-200 rounded-lg text-sm hover:bg-base-300 transition-colors"
              >
                   ✨ Write a creative story
              </button>
              <button 
                onClick={() => onSuggestionClick("Help me with coding")}
                className="p-3 bg-base-200 rounded-lg text-sm hover:bg-base-300 transition-colors"
              >
                💻 Help me with coding
              </button>
              <button 
                onClick={() => onSuggestionClick("Explain a concept")}
                className="p-3 bg-base-200 rounded-lg text-sm hover:bg-base-300 transition-colors"
              >
                📚 Explain a concept
              </button>
            </div>
          </div>
                  )}

        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId._id === authUser._id  ? 'chat-end' : 'chat-start'}`}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full">
                {message.senderId._id === '507f1f77bcf86cd799439011' ? (
                  <div className="justify-center flex items-center rounded-full ">
                    <Bot className="size-10 text-purple-600" />
                  </div>
                ) : (
                  <img
                    src={authUser.profilePic || '/avatar.png'}
                    alt="profile pic"
                    className="size-10 rounded-full object-cover"
                  />
                )}
              </div>
            </div>
            <div className="chat-header mb-1 flex items-center">
                <span className="text-sm font-medium">
                {message.senderId._id === '507f1f77bcf86cd799439011' ? 'Cora' : 'You'}
              </span>
              <time className="text-xs opacity-50 ml-1 text-center">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className={`chat-bubble max-w-xs sm:max-w-md lg:max-w-lg ${
              message.senderId._id === authUser._id 
                ? 'bg-violet-500' 
                : 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
            }`}>
              <p className="whitespace-pre-wrap leading-relaxed text-white">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="size-10 rounded-full flex items-center justify-center">
              <Bot className="size-10 text-purple-500 animate-pulse" />
            </div>
          </div>
          <div className="chat-header mb-1">
            <span className="text-sm font-medium">Cora</span>
          </div>
          <div className="chat-bubble bg-gradient-to-r from-purple-500 to-blue-500 text-white">
            <div className="flex items-center gap-2">
              <span className="loading loading-dots loading-sm"></span>
              <span>Thinking...</span>
            </div>
          </div>
        </div>
      )}

         <div ref={messageEndRef} />
        </div>
  )
}

export default AIMessages