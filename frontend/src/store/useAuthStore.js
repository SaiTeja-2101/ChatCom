import { create } from 'zustand';
import { axiosInstance } from '../lib/axios.js';
import { toast } from 'react-hot-toast';
import { useChatStore } from './useChatStore.js';
import {io} from 'socket.io-client'
const baseURL= import.meta.env.MODE==="development"? "http://localhost:5555/api" : "/";
export const useAuthStore = create((set,get) => ({
   authUser: null,
   isSigningUp: false,
   isLoggingIn: false,
   isUpdatingProfile: false,
   isCheckingAuth: true,
   onlineUsers: [],
   socket:null,
   connectSocket:()=>{
     const {authUser}=get();
     if(!authUser || get.socket?.connected)return;
     const socket=io(baseURL,{
      query:{
         userId:authUser._id
      }
     });
     socket.connect();
     set({socket:socket})
     socket.on("getOnlineUsers",(users)=>{
      set({onlineUsers:users});
     })
   },
   disconnectSocket:()=>{
    if(get.socket?.connected){
      get.socket.disconnect();
      set({socket:null}); 
    }
   },
   checkAuth: async () => {
      try {
         const res = await axiosInstance.get('/auth/checkAuth');
         set({ authUser: res.data })
         get().connectSocket();
      }
      catch (err) {
         console.error('Error checking auth:', err);
         set({ authUser: null })
      }
      finally {
         set({ isCheckingAuth: false })
      }
   },
   signup: async (data) => {
      set({ isSigningUp: true });
      try {
         const res = await axiosInstance.post('/auth/signup', data);
         //  set({authUser:res.data})
         if(res.data.message === 'Email already exists'){
            toast.error('Email already exists');
            return false;
         }
         toast.success('Account created successfully');
         return true;
      }
      catch (err) {
         console.log(err);
         toast.error('Could not sign up, please try again later');
         return false;
      }
      finally {
         set({ isSigningUp: false });
      }
   },
   logout: async () => {
      try {
         await axiosInstance.post('/auth/logout');
         set({ authUser: null });
         const  {clearChatState} =useChatStore.getState();
         clearChatState();
         toast.success('Logged out successfully');
         get().socket?.disconnect();
      }
      catch (err) {
         console.error('Error logging out:', err);
         toast.error(err.response.data.message || 'Could not log out, please try again later');
      }
   },
   login: async (data) => {
      set({ isLoggingIn: true })
      try {
         const res = await axiosInstance.post('/auth/login', data);
         set({ authUser: res.data });
         toast.success('Logged in successfully');
         get().connectSocket();
         return true;
      }
      catch (err) {
         console.log('Error logging in:', err);
         toast.error(err.response.data.message);
         return false;
      }
      finally {
         set({ isLoggingIn: false })
      }
   },
   updateProfile: async (data) => {
      set({ isUpdatingProfile: true });
      try {
         const res = await axiosInstance.put('/auth/updateProfile', data);
         set({ authUser: res.data });
         toast.success('Profile updated successfully');
         return true;
      }
      catch (err) {
         console.error('Error updating profile:', err);
         toast.error('Could not update profile, please try again later');
         return false;
      }
      finally {
         set({ isUpdatingProfile: false });
      }
   }
}))