import jwt from 'jsonwebtoken';
import { ApiResponse } from '../handler/ApiResponse.js';
const secret  = process.env.JWTSECRET;

function checkAuth(req,res,next) {
    try{
        let {accessToken} = req.cookies;
        if(!accessToken){
            return ApiResponse(res,401,null,"UnAuthorized Request ");
        }
        let auth = jwt.verify(accessToken,secret);
        if(auth){
            next();
        }else{
            return ApiResponse(res,401,null,"UnAuthorized Request ");
        }
    }
   catch(err){
        return ApiResponse(res,500,null,"Something Went Wrong "+err);
   }
}

export {checkAuth};