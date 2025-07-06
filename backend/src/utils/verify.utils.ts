import { Request,Response } from "express";

export const updatedIsVerified = async(req:Request,res:Response,model:any,decoded:any) =>{
    const update = await model.findByIdAndUpdate(decoded.id,{isVerified:true},{new:true});
    return update;
}