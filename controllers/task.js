import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js"

export const newTask = async (req, res, next)=>{
    try {
        const {title, description} = req.body;

        // const task =  new Task({title});
        // await task.save();
                //OR
        await Task.create({
            title, 
            description,
            user:req.user,
        });
        //The above two methods of creating or saving the data in mongoDB is same
        //we can use either one of them.

        res.status(201).json({
            success:true,
            message: "Task Added Successfully",
        })
    } catch (error) {
        next(error);
    }

}   

export const getMyTask = async (req, res, next) => {
    try {
        const userid = req.user._id;

        const tasks = await Task.find({user:userid});
        // if(!tasks) return next(new Error("Tasks Array Not found"));
        if(!task) return next(new ErrorHandler("Tasks Array not Found", 404));
        res.status(200).json({
            success:true,
            tasks,
        })
    } catch (error) {
        next(error);
    }

}

export const updateTask = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        // if(!task) return next(new Error("Task Not Found"));
        if(!task) return next(new ErrorHandler("Task not Found", 404));

        task.isCompleted = !task.isCompleted;
        await task.save();

        res.status(200).json({
            success:true,
            message:"Task Updated!"
        })
    } catch (error) {
        next(error);
    }
}

export const deleteTask = async (req, res, next)=>{
    try {
        const id = req.params.id;
        const task = await Task.findById(id);
        // if(!task){
        //     res.status(401).json({
        //         success:false,
        //         message: "Task not found!",
        //     })
        // }
        // if(!task) return next(new Error("Task not Found")); // In this method we were not able to pass the statusCode dynamically
        //Hence, we created an ErrorHandler class extends Error class through which we will be passing our msg as well as stausCode.
        if(!task) return next(new ErrorHandler("Task not Found", 404));

        // await task.remove(); // this remove() method has been removed in the lastest versions of mongoose
        await task.deleteOne();

        res.status(200).json({
            success:true,
            message:"Task Deleted Successfully"
        })
    } catch (error) {
        next(error);
    }
}