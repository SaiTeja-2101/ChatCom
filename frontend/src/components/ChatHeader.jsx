import React from 'react'
import { X } from 'lucide-react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="border-b border-base-300 p-2.5 bg-gradient-to-r from-purple-600 to bg-purple-500 text-white">
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-3'>
          <div className="avatar">
            <div className="size-10 rounded-full relative border shadow-lg">
              <img src={selectedUser.profilePic || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          <div>
            <h3 className='font-medium'>{selectedUser.fullName}</h3>
            <p className={`text-sm ${onlineUsers.includes(selectedUser._id) ? "text-white" : "text-gray-100"}`}>
              {onlineUsers.includes(selectedUser._id) ? "Active Now" : "Offline"}
            </p>
          </div>
        </div>
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader