import User from "../models/user.model.js";
import jwt from "jsonwebtoken"
export const protectRoute=async(req,res,next)=>{
  try{
    const token=req.cookies.jwt;
    if(!token){
        return res.status(401).send({message:"Unauthorized-No Token Provided"})
    }
    const validateUser=jwt.verify(token,process.env.JWT_SECRET);
    if(!validateUser){
        return res.status(401).json({message:"Unauthorized-Invalid Token"})
    }
    const user=await User.findById(validateUser.userId).select("-password");
    if(!user){
        return res.status(404).json({message:"User not found"});
    }
    req.user=user;
    next();

  }
  catch(err){
      console.log("Error in protectRoute middleware : ",err.message);
      res.status(500).json({message:"Internal server error"})
  }
}