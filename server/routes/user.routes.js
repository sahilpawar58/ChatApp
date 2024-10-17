import { Router } from "express";
import  userController  from "../controllers/User.controller.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const router  = new Router();

router.post('/createuser',userController.createUser);
router.post('/loginuser',userController.loginUser)
router.get('/checkcookie',checkAuth,userController.signinUser)

export default router;