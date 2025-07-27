import mongoose from "mongoose";
const messageSchema=new mongoose.Schema({
    senderId:{
      ref:"User",
      required:true,
      type:mongoose.Schema.Types.ObjectId
    },
    receiverId:{
      ref:"User",
      required:true,
      type:mongoose.Schema.Types.ObjectId
    },
    text:{
      type:String,
      default:""
    },
    profilePic:{
      type:String,
      default:""
    },
    image:{
        type:String
    }
},
{
    timestamps:true
})
const Message=mongoose.model('Message',messageSchema);
export default Message;