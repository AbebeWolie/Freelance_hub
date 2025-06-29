import express, {Request,Response} from 'express'
import faqController from '../controllers/faq.controller';

const router = express.Router();

const {
    getFAQs,
    getFAQById,
    createFAQ,
    updateFAQ,
    deleteFAQ,
} = faqController;

router.get('/faq',async(req:Request,res:Response)=>{
    try{
        await getFAQs(req,res);
    }catch{
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})

router.post('/faq',async(req:Request,res:Response)=>{
    try{
        await createFAQ(req,res);
    }catch{
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
})
export default router;