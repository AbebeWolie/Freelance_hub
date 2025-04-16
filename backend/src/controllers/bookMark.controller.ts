import { Request,Response } from "express"
import { Bookmark } from "../models/bookMarks.model"

// get bookmark
const getBookmarks = async(req:Request,res:Response) =>{
    try{
        const bookmark = await Bookmark.find().populate('userId jobId');
        if(!bookmark){
            return res.status(404).json({
                success:false,
                message:"No bookmark found",
            });
        }
        return res.status(200).json({
            success:true,
            message:"Bookmark succesfully created",
            data:bookmark
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error: error instanceof Error? error.message:String(error)           
        })
    }
}

//get bookmark by id
const getBookmarkById = async(req:Request,res:Response) =>{
    try{
        const bookmark = await Bookmark.findById(req.params.id);
        if(!bookmark){
            return res.status(404).json({
                success:false,
                message:"No bookmark found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Bookmark successfully fetched",
            data:bookmark
        })

    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error instanceof Error? error.message:String(error)
        })
    }
}
// create bookmark 

const createBookmark = async(req:Request,res:Response) =>{
    const {userId,jobId} = req.body;
    if(!userId || !jobId){
        return res.status(409).json({
            success:false,
            message:"Required field missed"
        })
    }
    const newBookmark = new Bookmark({
        userId,
        jobId
    });
    await newBookmark.save();
    return res.status(200).json({
        success:true,
        message:"Bookmark successfully created",
        data:newBookmark
    })
}

const deleteBookmarkById = async(req:Request,res:Response) =>{
    try{
        const exiting = await Bookmark.findById(req.params.id);
        if(!exiting){
            return res.status(404).json({
                success:false,
                message:"Bookmar not found to delete"
            })
        }
        const deleteBookmark = await Bookmark.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success:true,
            message:"Bookmar successfully deleted"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error: error instanceof Error? error.message:String(error)
        })
    }
}

export {
    getBookmarks,
    getBookmarkById,
    createBookmark,
    deleteBookmarkById,
};
