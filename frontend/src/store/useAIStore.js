import {create} from "zustand"
import {toast} from "react-hot-toast"
import { axiosInstance } from "../lib/axios"

export const useAIStore=create((set,get)=>({
    messages:[],
    isLoading:false,
    sendQuerytoAI:async(messageText)=>{
        if(!messageText || messageText.trim() === ""){
            toast.error("Message cannot be empty.");
            return;
        }
        set({isLoading:true});
       try{
        const messages=get().messages;
        const response=await axiosInstance.post("/geminiAI/saveMessage",{message:messageText});
        const {userMessage}=response.data;
        set({messages:[...messages,userMessage]})
        const res=await axiosInstance.post("/geminiAI/chat",{message:messageText});
        const {aiMessage}=res.data;
        const updatedMessages  =get().messages;
        set({messages:[...updatedMessages,aiMessage]});
       }
       catch(err){
        console.error("Error sending query to AI:", err);
        toast.error("Failed to send query to AI. Please try again.");
       }
       finally{
        set({isLoading:false});
       }
    },
    getPreviousMessages:async()=>{
        set({isLoading:true});
        try{
            const res=await axiosInstance.get("/geminiAI/responseHistory");
            set({messages:res.data})
            
        }
        catch(err){
             console.error("Error loading AI conversation:", err);
      toast.error("Failed to load conversation.");
        }
        finally{
            set({isLoading:false});
        }
    }
}))