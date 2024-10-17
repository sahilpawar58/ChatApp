import { Router } from "express";
import  userController  from "../controllers/User.controller.js";

const router  = new Router();

router.post('/user',userController.createUser);
router.get('/checkcookie',userController.signinUser)

export default router;