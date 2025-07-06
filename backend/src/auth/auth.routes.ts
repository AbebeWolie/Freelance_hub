import express, {Request,Response} from "express";
import { verifyEmail } from "./auth.controller";
import { register, login } from "./auth.controller";


const router = express.Router();

// router.post("/register", register);
// router.post("/login", login);

router.get('/verify-email/:token', async(req:Request,res:Response)=>{
    await verifyEmail(req,res);
})

export default router;
