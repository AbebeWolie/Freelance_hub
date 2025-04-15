import {Request,Response} from 'express';
import { Application } from '../models/application.model';

// Get all application

const getApplication = async(req:Request,res:Response) =>{
    try{
        const app = await Application.find();
        if(!app){
            return res.status(404).json({
                success:false,
                message:"Application not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"All Applictions successfully fetched",
            data:app
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

// Get application by id

const getApplicationById = async(req:Request,res:Response) =>{
    const {appId} = req.params;
    try{
        const app = await Application.findById(appId);
        if(!app){
            return res.status(404).json({
                success:false,
                message:"Application not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Application fetched"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

// Create application

const createApplication = async(req:Request,res:Response) =>{
    const {jobId,freelancerId,coverLetter,status} = req.body
    if(!jobId || !freelancerId || !coverLetter || !status){
        return res.status(400).json({
            success:false,
            message:"Required fields missed"
        })
    }
    try{
        const existingApp = await Application.findOne({jobId,freelancerId})
        if(existingApp){
            return res.status(409).json({
                success:false,
                message:"Application already existed"
            })
        }
        const application = new Application({jobId,freelancerId,coverLetter,status});
        await application.save();
        return res.status(200).json({
            success:true,
            message:"Application successfully created"
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server"
        })
    }
}
