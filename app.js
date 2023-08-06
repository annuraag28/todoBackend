import express from "express";
import userRouter from "./routes/user.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import taskRouter from "./routes/task.js";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();
// config()
dotenv.config({
    path:"./data/config.env",
})

//using this middleware we can receive the data from postman OR req.body will not be undefined anymore
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin : [process.env.FRONTEND_URL],
    methods : ["GET","POST","PUT","DELETE"],
    credentials:true, // This will allow the cookies to be set in frontend, otherwise it won't go to frontend.
}))
//express json should be used first before any router, So that we can read the input data from postman first and then act on it.
app.use("/api/v1/users",userRouter);
app.use("/api/v1/task",taskRouter);

app.get('/',(req,res)=>{
    res.send("Nice working");
});

app.use(errorMiddleware);

//we will use all the middleware inside app.js file 
