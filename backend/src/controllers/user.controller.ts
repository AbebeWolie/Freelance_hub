import {Request,Response } from 'express';
import User from '../models/user.model';


// GET ALL USER

const getUser = async (req:Request,res:Response) =>{
    try{
        const user = await User.find();
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"User succefully fetched",
            data:user
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    };
}

// GET USER BY ID

const getUserById = async(req:Request,res:Response) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        return res.status(200).json({
            success:true,
            message:"User successfully fetched",
            data:user
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}


export default {
    getUser,
    getUserById
}