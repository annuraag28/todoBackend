import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";


//using try catch block wherever the code is async.

export const login = async (req,res, next)=>{
    try {
        const {email,password} = req.body;

        //password mein select is false, that is why we have to take the password exclusively
        const user = await User.findOne({email}).select("+password");
        // if(!user){
        //     res.status(404).json({
        //         success:false,
        //         message:"Invalid email or password",
        //     })
        // }
        if(!user) return next(new ErrorHandler("Invalid email or password",400));

        const isMatch = await bcrypt.compare(password,user.password);
        // if(!isMatch){
        //     res.status(404).json({
        //         success:false,
        //         message:"Invalid email or password",
        //     })
        // }
        if(!isMatch) 
        return next(new ErrorHandler("Invalid email or password",400));

        sendCookie(user,res,`Welcome back ${user.name}`,200);
    } catch (error) {
        next(error);
    }
};

export const register = async (req, res)=>{
   try { 
    const {name, email, password} = req.body;
    let user = await User.findOne({email});
    // if(user){
    //     res.status(404).json({
    //         success: false,
    //         message:"User is already registered",
    //     })
    // }
    if(user) return next(new ErrorHandler("User Already Exists",400));
    const hashedPassword = await bcrypt.hash(password,10);
    user = await User.create({name, email, password:hashedPassword});
    //to pass cookie we will generate one token using jwt
    sendCookie(user,res,"Registered Successfully",201);

   } catch (error) {
        next(error);
   }

};

export const getMyProfile = (req,res)=>{
    const user = req.user;
    res.status(200).json({
        success:true,
        user,
    })
        // console.log(decoded); //{ _id: '64cdef4f7b78b1e9c55f9e78', iat: 1691222313 }
};

export const logout = (req, res) => {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Develpoment" ? false : true,
      })
      .json({
        success: true,
        user: req.user,
      });
  };
// export const logout = (req, res)=>{
//     try {
//         res.status(200).cookie("token","",{
//             expires:new Date(Date.now()),
//             sameSite: process.env.NODE_ENV==="Developement" ? "lax":"none",
//             secure: process.env.NODE_ENV==="Developement" ? false:true, 
//         })
//         .json({
//             success:true,
//             user:req.user
//         });
//     } catch (error) {
//         next(error);
//     }
// }





// export const getMyProfile1 = async (req,res)=>{
//     res.send("Api toh chal raha hai");
// };

// export const updatedUser = async (req,res)=>{
//     const {id} = req.params;
//     // const user = await User.findById(id);
//     res.json({
//         success:true,
//         message: "user updated Successfully",
//     })
// }
// export const deleteUser = async (req,res)=>{
//     const {id} = req.params;
//     const user = await User.findById(id);

//     // await User.deleteOne(id);

//     res.json({
//         success:true,
//         message: "user Deleted Successfully",
//     })
// }