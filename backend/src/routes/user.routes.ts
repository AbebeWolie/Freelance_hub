import express, {Request,Response} from 'express';
import userController from '../controllers/user.controller';


const router = express.Router();
const {
    createUser,
    updateUser,
    getUser,
    getUserById,
    getProfile,
    loginUser,
    searchUser
} = userController;




// router.get('/users',async(req:Request,res:Response)=>{
//     try{
//         await getUser(req,res);
//     }catch{
//         res.
//     }
// })


router.post('/users',async(req:Request,res:Response)=>{
    try{
        await createUser(req,res);

    }catch(error){
        res.status(500).json({
            success:false,
            message:'error creating user',
            error: error instanceof Error ? error.message : error,
        })
    }
});
export default router;