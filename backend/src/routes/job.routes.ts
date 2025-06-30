import express,{Request,Response} from 'express';
import jobController from '../controllers/job.controller';
import { Message } from '../models/message.model';
import { error } from 'console';

const router = express.Router();

const {

  getJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,

} = jobController;


router.get('/jobs',async(req:Request,res:Response)=>{
    try{
        await getJobs(req,res);
    }catch(error){
        res.status(500).json({
            success:false,
            Message:'Internal server error',
            error: error instanceof Error?error.message:error
        })
    }
})

router.get('/jobs/:id',async(req,res)=>{
    try{
        await getJobById(req,res);
    }catch(error){
        res.status(500).json({
            success:false,
            Message:'Internal Server error',
            error:error instanceof Error ? error.message:error
        })
    }
})

router.post('/jobs',async(req,res)=>{
   try{
     await createJob(req,res);
   }catch(error){
    res.status(500).json({
        success:false,
        Message:'Internal server error',
        error:error instanceof Error?error.message:error
    })
   }
})

router.put('/jobs/:id',async(req,res)=>{
    try{
        await updateJob(req,res);
    }catch(error){
         res.status(500).json({
            success:false,
            Message:'Internal server error',
            error:error instanceof Error?error.message:error
        })
    }
})

router.delete('/jobs/:id', async(req:Request,res:Response)=>{
    try{
        await deleteJob(req,res);
    }catch(error){
        res.status(500).json({
            success:false,
            Message:'internal server error',
            error:error instanceof Error?error.message:error
        })
    }
})

export default router;