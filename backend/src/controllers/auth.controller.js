import bcrypt from 'bcrypt';
import User from '../models/user.model.js'
import { generateToken } from '../lib/utils.js';
import cloudinary from '../lib/cloudinary.js';
// import { toast } from 'react-hot-toast';
export  const  login=async(req,res)=>{
    const {email,password}=req.body;
    try{
        const foundUser=await User.findOne({email})
            if(!foundUser){
                 return res.status(400).json({message:"Invalid Credentials"});
            }
        const verifyPwd=await bcrypt.compare(password,foundUser.password);
        if(!verifyPwd){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        generateToken(foundUser._id,res);
        res.status(200).json({
            _id:foundUser._id,
            fullName:foundUser.fullName,
            email:foundUser.email,
            profilePic:foundUser.profilePic,
            createdAt:foundUser.createdAt,
            updatedAt:foundUser.updatedAt,
        });
    }
    catch(err){
          console.log("Error in login controller:",err.message);
          res.status(500).json({message:"Internal Server Error"})
    }
}

export const signup = async(req, res) => {
    const {fullName,email,password}=req.body;
    try{
    if(!fullName || !email || !password){
        return res.status(400).json({message:"All fields are required"});
    }
    if(password.length<7){
        return res.status(400).json({message:"Password must be at least 7 characters long"});
    }
    const newname=fullName.charAt(0).toUpperCase() + fullName.slice(1);
    const user=await User.findOne({email});
    if(user){
    //    toast.error("Email already exists");

       return res.status(400).json({message:"Email already exists"});
    }
    const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt);
    const newUser=new User({
        fullName:newname,
        email,
        password:hashedPassword
    })
    //  await newUser.save();
    //  if(newUser){
    //     generateToken(newUser._id,res);
    //     await newUser.save();
    //     res.status("201").json({
    //         _id:newUser._id,
    //         fullname:newUser.fullName,
    //         email:newUser.email,
    //         profilePic:newUser.profilePic,
    //     })
    //  }
    //  else{
    //     res.status(400).json({message:"Invalid User data"});
    //  }
     await newUser.save(); // Save user first!
        // generateToken(newUser._id, res); // Set cookie
        return res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            profilePic: newUser.profilePic,
        });
    }
    catch(err){
           res.status(500).json({error: "Server error", details: err.message});
    }
}

export const logout = (req, res) => {
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message:"Logged Out Successfully"})
    }
    catch(error){
       console.log("Error in logout controller",error.message);
       res.status(500).json({message:"Internal Server Error"});
    }
} 
export const updateProfile=async(req,res)=>{
 try{
    const {profilePic,fullName}=req.body;
    const userId=req.user._id;
    
    let updatedData={};
    if(profilePic && profilePic.trim() !== ''){
    const uploadResponse=await cloudinary.uploader.upload(profilePic);
    updatedData.profilePic=uploadResponse.secure_url;
  }
  if(fullName && fullName.trim() !== ''){
    updatedData.fullName=fullName.charAt(0).toUpperCase() + fullName.slice(1);
  }
  if(Object.keys(updatedData).length === 0){
    return res.status(400).json({message:"No data to update"});
  }
  const updatedUser=await User.findByIdAndUpdate(userId,
    updatedData,
  {new:true}

  ).select("-password");
 
  if(!updatedUser){
    return res.status(400).json({message:"User not found"});
  }
   res.status(200).json({
    _id:updatedUser._id,
    fullName:updatedUser.fullName,
    email:updatedUser.email,
    profilePic:updatedUser.profilePic,
    createdAt:updatedUser.createdAt,
    updatedAt:updatedUser.updatedAt
  });
 }
 catch(error){
    console.log("Error in updateProfile controller",error.message);
    res.status(500).json({message:"Internal Server Error"});

 }
}
export const checkAuth=async(req,res)=>{
    try{
        res.status(200).json(req.user)
    }
    catch(error){
        console.log("Error in checkAuth controller",error.message);
        res.status(500).json({message:"Internal Server Error"});
    }
}