import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore.js';
import { Users } from "lucide-react"
import { useAuthStore } from '../store/useAuthStore.js';
import SideBarSkeleton from '../skeletons/SideBarSkeleton';
const Sidebar = () => {
  const { getUsers, users, isUsersLoading, setSelectedUser, selectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getUsers();
  }, [getUsers]);


  if (isUsersLoading) return <SideBarSkeleton />
  return (
    <aside className="h-full flex flex-col transition-all duration-200 border-r border-base-300 w-20 lg:w-72 bg-sidebar text-foreground">
      <div className="w-full p-5 border-b border-base-300">
        <div className='flex gap-2 items-center'>
          <Users className="size-6" />
          <span className="hidden lg:block font-medium text-lg">Contacts</span>
        </div>
        {/* <div className=''>

         </div> */}
      </div>
      <div className="py-3 overflow-y-auto w-full">

        {users.map((user, index) => {
          return <button className={`flex items-center w-full p-3 gap-3 hover:bg-msghover transition-colors ${selectedUser?._id === user._id ? 'ring-1 ring-base-300' : ''}`} key={user._id} onClick={() => setSelectedUser(user)} >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || '/avatar.png'}
                alt={user.fullName}
                className='rounded-full object-fill size-12'
              />
              {onlineUsers.includes(user._id) && (
                <span className='absolute bottom-0 right-0 bg-primary size-3 rounded-full ring-2 ring-base-100' />
              )}
            </div>
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div className={`text-sm ${onlineUsers.includes(user._id) ? "text-green-500" : "text-zinc-400"}`}>
                {onlineUsers.includes(user._id) ? "Active Now" : "Offline"}
              </div>
            </div>
          </button>
        })}

      </div>
    </aside>
  )
}

export default Sidebar