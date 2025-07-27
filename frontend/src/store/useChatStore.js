import {toast} from 'react-hot-toast';
import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { useAuthStore } from './useAuthStore.js';
import {io} from 'socket.io-client';
export const useChatStore=create((set,get)=>({
    isUsersLoading:false,
    isMessagesLoading:false,
    messages:[],
    users:[],
    selectedUser:null,
    clearChatState:()=>{
        set({
            messages:[],
            selectedUser:null
        })
    },
    getUsers:async()=>{
        set({isUsersLoading:true});
        try{
            const response=await axiosInstance.get('/messages/users');
            set({users:response.data});
        }
        catch(err){
            toast.error(err.response.data.message || 'Could not fetch users, please try again later');
        }
        finally{
            set({isUsersLoading:false});
        }
    },
    getMessages:async(userId)=>{
        set({isMessagesLoading:true});
        try{
            const response=await axiosInstance.get(`/messages/users/${userId}`);
            set({messages:response.data});
        }
        catch(err){
            toast.error(err.response.data.message || 'Could not fetch messages, please try again later');
        }
        finally{
            set({isMessagesLoading:false});
        }
    },
    setSelectedUser:(selectedUser)=>{set({selectedUser:selectedUser})},
    sendMessage:async(message)=>{
        const {selectedUser,messages}=get();
         try{
             const response=await axiosInstance.post(`/messages/sendMessage/${selectedUser._id}`,message)
             set({messages:[...messages,response.data]})
         }
         catch(err){
            toast.error(err.response.data.message || 'Could not send message, please try again later');
         }
    },
    subscribeToMessages:()=>{
         const {selectedUser}=get();
         if(!selectedUser)return;
         const socket=useAuthStore.getState().socket;
         if(!socket || !socket.connected)return;
         socket.on("deliverMessage",(message)=>{
            const {messages}=get();
            set({
                messages:[...messages,message]
            })
         })
    },
    unsubscribeFromMessages:()=>{
        const socket=useAuthStore.getState().socket;
        if(!socket)return;
        socket.off("deliverMessage");
    }

}))