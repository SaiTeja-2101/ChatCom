import mongoose from 'mongoose';
const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    fullName:{
        type:String,
        required:true
    },
    profilePic:{
        default:"",
        type:String
    },
    password:{
        type:String,
        required:true,
        minLength:7
    },
},{
    timestamps:true
}
);
const User=mongoose.model('User',userSchema);
export default User;