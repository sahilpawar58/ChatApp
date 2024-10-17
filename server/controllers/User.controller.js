import { model } from "mongoose";
import { ApiResponse } from "../handler/ApiResponse.js";
import { User } from "../models/user.schema.js";

const createUser = async(req, res) =>{
    const {username,password,email} = req.body;
    console.log(username);
    if(!username){
        return ApiResponse(res,403,"Invalid Request");
    }
    try{
        const user = new User({
            username,
            password,
            email
        })
    
        await user.save();
    
        return ApiResponse(res,200,"done")

    }catch(err){
        return ApiResponse(res,500,"",err);
    }

}
const userController = {
    createUser
}

export default userController