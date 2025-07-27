import { getGeminiModel } from "../lib/gemini.js";
import Message from "../models/message.model.js";
import { AI_USER_ID } from "../lib/aiUser.js";
export const saveMessage=async(req,res)=>{
    try{
        const userId=req.user._id;
        const {message}=req.body;
        if(!message || message.trim()===""){
            return res.status(400).json({error:"Please provide a valid message."});
        }
        const userMessage=new Message({
        senderId:userId,
        receiverId:AI_USER_ID,
        text:message
       })
       await userMessage.save();
       await userMessage.populate('senderId', 'fullName profilePic');
       return res.status(200).json({userMessage});
    }
    catch(error){
        console.error("Error in saveMessage:", error);
        return res.status(500).json({error:"Internal server error."});
    }
}
export const getAiResponse=async(req,res)=>{
    try{
    const userId=req.user._id
    const username=req.user.fullName;
    const {message}=req.body;
    if(!message || message.trim()===""){
        return res.status(400).json({error:"Please provide a valid message."});
    }
    const conversationHistory=await Message.find({
        $or:[
            {senderId:userId,receiverId:AI_USER_ID},
            {senderId:AI_USER_ID,receiverId:userId}
        ]
    })
    .populate('senderId','fullName')
    .limit(6)
    .sort({createdAt:-1})

    let prompt= 'You are Cora, a helpful AI assistant in ChatCom. Respond naturally without prefixing your name. Previous conversation:\n\n';
    if(conversationHistory.length>0){
        conversationHistory.reverse().forEach((msg)=>{
            let sender=msg.senderId._id.toString()===userId.toString() ?username : msg.senderId.fullName;
            prompt+= `\n${sender}: ${msg.text}`;
        })
    }
    prompt+= `\n${username} : ${message}\n`

    const model=getGeminiModel();
    const result=await model.generateContent(prompt);
    const response=result.response;
    const aiResponse=response.text();

    
    const aiMessage=new Message({
        senderId:AI_USER_ID,
        receiverId:userId,
        text:aiResponse
    })
    await aiMessage.save();
    
    await aiMessage.populate('senderId', 'fullName profilePic');
    return res.status(200).json({
        // userMessage,
        aiMessage
    });
    }
    catch(error){
        console.error("Error in getAiResponse:", error);
        return res.status(500).json({error:"Internal server error."});
    }
}
export const getAiResponseHistory = async (req, res) => {
    try{
      const userId=req.user._id;
      const messages=await Message.find({
         $or:[
            {senderId:userId,receiverId:AI_USER_ID},
            {senderId:AI_USER_ID,receiverId:userId}
        ]
        
      })
      .populate('senderId','fullName profilePic')
      .sort({createdAt:1})
      res.status(200).json(messages);
    }
    catch(err){
        console.error("Error in getAIConversation:", err);
        res.status(500).json({ error: "Failed to load conversation history." });
    }
}