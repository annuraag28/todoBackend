import jwt from "jsonwebtoken";

export const sendCookie = (user,res,message,statusCode) =>{
    const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET);

    res.status(statusCode).cookie("token",token,{
        httpOnly:true,
        maxAge: 15*60*1000, //15 min. is the expired time
        sameSite: process.env.NODE_ENV==="Developement" ? "lax":"none",
        secure: process.env.NODE_ENV==="Developement" ? false:true, 
        //The same cookie property should be set for logout function also, otherwise logout function will not work.
        // if sameSite is none then secure must be true. //Bydefault sameSite is lax and secure is false.
        //Ab agar none kiya toh secure ko true karna pada. jiske karan cookies ab nahi dikhengi humko humare backend mein bhi.
        //hum conditon laga denge ek variable env mein leke.
    }).json({ 
        success:true,
        message,
    });

}