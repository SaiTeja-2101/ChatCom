import React,{useState,useRef} from 'react'
import { useChatStore } from '../store/useChatStore.js';
import { Image, Send,X } from 'lucide-react';
import toast from 'react-hot-toast';
const MessageInput = () => {
  const [text,setText]=useState('');
  const inputRef=useRef(null);
  const [imagePreview,setImagePreview] = useState(null);
  const {sendMessage} = useChatStore();
  const removeImage = () => {
    setImagePreview(null);
    if(inputRef.current){
      inputRef.current.value = '';
    }
  }
  const handleImageChange = (e) => {
    const file=e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select a valid image file.");
      return;
    }
    const reader=new FileReader();
    reader.onloadend=()=>{setImagePreview(reader.result)};
    reader.readAsDataURL(file);
  }
  const handleSendMessage = async(e) => {
    e.preventDefault();
    if(!text.trim() && !imagePreview) return;
     try{
        await sendMessage({
          text:text.trim(),
          image:imagePreview
        })
        setText('');
        setImagePreview(null);
        if(inputRef.current){
          inputRef.current.value = '';
        }
     }
     catch(err){
        console.error("Error sending message:", err);
     }
  };
  return (
     <div className="p-4 w-full">
       {imagePreview && (
            <div className="mb-2 flex items-center">
              <div className="relative">
                <img className='size-20 object-cover rounded-lg border border-zinc-700' src={imagePreview} alt="Preview" />
                <button className='absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full dark:bg-darklayer1
              flex items-center justify-center' onClick={removeImage} type="button" >
                <X size={16} className='text-zinc-500' />
                </button>
                </div>
            </div>
          )}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-4">
         
          <input
            type="text"
            placeholder='Type a message...'
            value={text}
            className="input input-bordered input-md sm:input-md w-full rounded-lg shadow-md bg-background"
            onChange={(e)=>setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleImageChange}
            />
            <button
            type="button"
            className={`hidden sm:flex btn btn-ghost 
                     ${imagePreview ? "text-blue-600" : "text-zinc-400"}`}
            onClick={()=>inputRef.current.click()}
          >
            <Image size={23} />
          </button>
        </div>
        <button 
         type="submit"
         className={`btn btn-circle p-2
         ${!text.trim() && !imagePreview ? "btn-disabled" : "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:bg-purple-700 shadow-md hover:shadow-lg transition-all"}`}
         disabled={!text.trim() && !imagePreview}
       >
         <Send size={20} />
       </button>
      </form>
     </div>
  )
}

export default MessageInput