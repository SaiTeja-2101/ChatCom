import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { useAuthStore } from '../store/useAuthStore.js'
import formatDate from '../lib/utils.js'
import MessageSkeleton from '../skeletons/MessageSkeleton'
import AIChatComponent from './AIChatComponent.jsx'
const ChatContainer = () => {
    const { selectedUser, messages, getMessages, isMessagesLoading, unsubscribeFromMessages ,subscribeToMessages} = useChatStore();
    const { authUser } = useAuthStore();
    const messagesEndRef = React.useRef(null);
    useEffect(() => {
        if(!selectedUser) return;
        getMessages(selectedUser._id);
        subscribeToMessages();
        return () => {
            unsubscribeFromMessages();
        };
    }, [selectedUser._id]);
    useEffect(()=>{
        if(messages.length>0){
            messagesEndRef.current?.scrollIntoView({behaviour:'scroll'})
        }
    },[messages])
    if (isMessagesLoading) {
        return <MessageSkeleton />;
    }
    if(selectedUser?.isAI || selectedUser?._id === '507f1f77bcf86cd799439011'){
        return <AIChatComponent />
    }
    if(selectedUser){
    return (
        <div className="flex flex-1 flex-col overflow-y-auto bg-messagebg">
            <ChatHeader />
            <div className='flex-1 overflow-auto p-4 space-y-4'>
                {Array.isArray(messages) && messages.map((message) => {
                    return (
                        <div key={message._id} className={`chat ${message.senderId === authUser._id ? 'chat-end' : 'chat-start'}`}>
                            <div className="chat-image avatar">
                                <div className="w-10 rounded-full">
                                    <img src={`${message.senderId === authUser._id ? authUser.profilePic || '/avatar.png' : selectedUser.profilePic || '/avatar.png'}`}
                                        alt="ProfilePic"
                                        className="object-cover rounded-full shadow-md " />
                                </div>
                            </div>
                            <div className="chat-header">
                                <time className="text-xs opacity-50">{formatDate(message.createdAt)}</time>
                            </div>
                            <div className="chat-bubble rounded-lg text-white bg-purple-600 flex flex-col max-w-xs sm:max-w-md lg:max-w-lg break-words">
                                {message.image && (
                                    <img src={message.image} alt="img" className='rounded-md mb-2 object-cover sm:max-w-[200px]' />
                                )}
                                {message.text && (
                                    <p className="break-words whitespace-pre-wrap leading-relaxed">
                                        {message.text}
                                    </p>
                                )}
                            </div>
                        </div>
                    )
                })}
                <div ref={messagesEndRef} />
            </div>
            <MessageInput />
        </div>
    
    )
}
}
export default ChatContainer