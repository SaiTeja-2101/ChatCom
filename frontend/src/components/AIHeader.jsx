import React from 'react'
import { CircleArrowLeft } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { X } from 'lucide-react';
import { Bot } from 'lucide-react';
const AIHeader = () => {
  const { selectedUser, onlineUsers, setSelectedUser } = useChatStore();
  if (selectedUser)
    return (
      <div className="relative p-3 border-b border-base-300 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
  {/* Arrow on extreme left */}
  <button className="absolute left-3 top-1/2 -translate-y-1/2 hover:opacity-80" onClick={() => setSelectedUser(null)}>
    <CircleArrowLeft className="size-7" />
  </button>

  {/* Centered content */}
  <div className="flex justify-center">
    <div className="flex items-center gap-3">
      <div className="size-12 rounded-full flex items-center justify-center">
        <Bot className="size-9" />
      </div>
      <div>
        <h3 className="font-bold text-2xl">Cora</h3>
        <p className="text-white/70 text-sm">Your AI Assistant</p>
      </div>
    </div>
  </div>
</div>

    )
}

export default AIHeader