import mongoose from "mongoose";

export const connectDB = () =>{
    const uri = process.env.MONGO_URI;
    mongoose.connect(uri,{
    dbName:"backendapis",
    }).then(()=>console.log("Database Connected"))
    .catch((e)=>console.log(e))
}
