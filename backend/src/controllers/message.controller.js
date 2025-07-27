import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary  from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";
export const getAllUsers=async(req,res)=>{
   try{
        const curruserId=req.user._id;
         const AI_USER_ID = '507f1f77bcf86cd799439011';
        const users=await User.find({_id:{$nin:[curruserId,AI_USER_ID]}}).select("-password");
        res.status(200).json(users);
   }
   catch(err){
         console.log("Error in getAllUsers controller : ",err.message);
         res.status(500).json({message:"Internal server error"});
   }
}
export const getMessages=async(req,res)=>{
    try{
        const {id:userToChatId}=req.params;
        const currUserId=req.user._id;
        const messages=await Message.find({
            $or:[
                {senderId:currUserId,receiverId:userToChatId},
                {senderId:userToChatId,receiverId:currUserId}
            ]
        })
        res.status(200).json(messages);
    }
    catch(err){
        console.log("Error in getMessages controller : ",err.message);
        res.status(500).json({message:"Internal server error"});
    }
}
export const sendMessage=async(req,res)=>{
    try{
        const {id:receiverId}=req.params;
        const senderId=req.user._id;
        const {text,image}=req.body;
        let imageUrl;
        if(image){
              const uploadResponse=await cloudinary.uploader.upload(image);
              imageUrl=uploadResponse.secure_url;
        }
        const newMessage=new Message({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })
        await newMessage.save();
        const receiverSocketId=getReceiverSocketId(receiverId) 
        if(receiverSocketId){
            io.to(receiverSocketId).emit("deliverMessage",newMessage); 
        }
         res.status(200).json(newMessage);
    }
    catch(err){
        console.log("Error in sendMessage controller : ",err.message);
        res.status(500).json({message:"Internal server error"});
    }
}
