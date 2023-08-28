import jwt from "jsonwebtoken"
import ErrorHandler from "../middlewares/error.js";

export const validUser = (req,res,task,next) =>{
    const user = task.user;

    const {token} = req.cookies;
    const decoded = jwt.verify(token,process.env.JWT_SECRET);

    if(user!=decoded._id){
        // res.status(404).json({
        //     success:false,
        //     message:"You are not authenticated"
        // })
        next(new ErrorHandler("You are not authenticated",404));
        return false;
    }
    return true;
}