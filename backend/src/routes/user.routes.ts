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



router.get('/users', async(req:Request,res:Response)=>{
    try{
        await getUser(req,res);
    }catch(error){
        res.status(500).json({
            success:false,
            Message:"Internal server Error",
            error: error instanceof Error ? error.message : error,
        })
    }
})


router.get('/users/:id',async(req:Request,res:Response)=>{
    try{
        await getUserById(req,res);
    }catch(error){
        res.status(500).json({
            success:false,
            Message:'Internal server error',
            error: error instanceof Error ? error.message : error,
        })
    }
})

router.get('/user_profile/:id',async(req:Request,res:Response)=>{
    try{
        await getProfile(req,res);
    }catch(error){
        res.status(500).json({
            success:false,
            Message:'Internal server error',
            error:error instanceof Error? error.message:error
        })
    }
})

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

router.put('/user/:id',async(req,res)=>{
    try{
        await updateUser(req,res)
    }catch(error){
        res.status(500).json({
        success:false,
        Message:'Internal server error',
        error:error instanceof Error?error.message:error
    })

    }
})


router.post('/user_login',async(req,res)=>{
    try{
        await loginUser(req,res);
    }catch(error){
        res.status(500).json({
            success:false,
            Message:'Internal server error',
            error : error instanceof Error?error.message:error
        })
    }
})


export default router;