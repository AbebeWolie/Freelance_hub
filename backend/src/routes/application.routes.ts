import express,{Request,Response} from 'express';
import applicationController from '../controllers/application.controller';
import { Message } from '../models/message.model';

const router = express.Router();
const {
    getApplications,
    getApplicationById,
    createApplication,
    updateApplicationById,
    deleteApplicationById
}= applicationController;

router.get('/applications',async(req:Request,res:Response)=>{
    try{
        await getApplications(req,res)
        console.log('get');
        
    }catch{
        res.status(500).json({
            success:false,
            Message:'internal server error'
        })
    }
})

router.post('/applications',async(req:Request,res:Response)=>{
    try{
        await createApplication(req,res);
        console.log('post');
        
    }catch{
        res.status(500).json({
            success:false,
            Message:'Internalserver Errore'
        })
    }

})




export default router;
