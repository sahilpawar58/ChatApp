import { model } from "mongoose";
import { ApiResponse } from "../handler/ApiResponse.js";
import { User } from "../models/user.schema.js";
import { hashPassword } from "../services/utils.js"
import { getUser, setUser } from "../services/auth.js";


const createUser = async(req, res) =>{
    const {username,password,email} = req.body;
    console.log(username);
    if(!username){
        return ApiResponse(res,403,"Invalid Request");
    }
    try{
        const hashedPassword = await hashPassword(password);
        const user = new User({
            username,
            password: hashedPassword,
            email
        })
    
        await user.save();
        const cookie = setUser({username,email});

        
        res.cookie("accessToken",cookie);
        return ApiResponse(res,200,"User Created Successfully")

    }catch(err){
        return ApiResponse(res,500,"Something Went Wrong",err);
    }
}

const loginUser = async(req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return ApiResponse(res, 403, "Invalid Request");
    }
    try{
       User.findOne({username})
       .then((doc)=>{
        if(doc){
            const cookie = setUser({username:doc.username,password:doc.password});
            res.cookie("accessToken",cookie)
            return ApiResponse(res, 200, "Successfull",null,doc);
        }else{
            return ApiResponse(res, 403, null,"Invalid Username or password");
        }
       })
       .catch(()=>{
        return ApiResponse(res, 500, null,"Server error "+err);
       })
    }catch(err){
        return ApiResponse(res, 500,null, "Server error "+err);
    }

}

const signinUser = async(req, res) => {
    const {accessToken} = req.cookies;

    if(!accessToken){
        return ApiResponse(res,403,"Invalid Request");
    }

    try{
        if(getUser(accessToken)){
            return ApiResponse(res,200,"Login Successfull",null,accessToken);
        }else{
            return ApiResponse(res,401,"Unauthorized Request")
        }
    }
    catch(err){
        return ApiResponse(res,500,"Something Went Wrong",err);
    }

}
const userController = {
    createUser,
    signinUser,
    loginUser
}

export default userController