import jwt from 'jsonwebtoken';
export const generateToken=(userId,res)=>{
    const token=jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:'7d'});
    res.cookie("jwt",token,{
        maxAge:7*86400*1000,//in milliseconds
        httpOnly:true,//makes the cookie inaccessible to JavaScript on the client (for security).
        sameSite:"strict",//helps prevent CSRF attacks by not sending the cookie on cross-site requests.
        secure:process.env.NODE_ENV!=="development"//ensures the cookie is only sent over HTTPS in production.

    });
    return token;
}