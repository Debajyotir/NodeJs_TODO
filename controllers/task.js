import ErrorHandler from '../middlewares/error.js';
import {Task} from '../models/task.js'
import { validUser } from '../utils/validUser.js';

export const newTask = async(req,res,next) =>{
    const {title,description} = req.body;
    try {
        await Task.create({
            title,
            description,
            user : req.user,
        });
        res.status(201).json({
            success:true,
            message:"Task add successfully",
        })
    } catch (error) {
        next(error);
    }
}


export const getMyTask = async(req,res,next) =>{
    const userid = req.user._id;

    try {
        const task = await Task.find({user:userid});

    res.status(200).json({
        success:true,
        task
    })
    } catch (error) {
        next(error);
    }
}


export const updateTask = async(req,res,next) =>{

    const {id} = req.params;
    try {
        const task = await Task.findById(id);

        if(validUser(req,res,task,next)){

            task.isCompleted = !task.isCompleted;

            await task.save();

            res.status(200).json({
                success:true,
                message:"Task updated"
            })
        }
    } catch (error) {
        next(error);
    }
    
}


export const deleteTask = async(req,res,next) =>{
    
    const {id} = req.params;
    try{
        const task = await Task.findById(id);

        if(validUser(req,res,task,next)){

            await task.deleteOne();

            res.status(200).json({
                success:true,
                message:"Task Deleted"
            })
        }
    }
    catch(error){
        next(error);
    }

}