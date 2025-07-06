import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';
import generateToken from '../utils/jwt.utils';
import { sendVerificationEmail } from '../utils/emailService';
import jwt from 'jsonwebtoken';
import { Admin } from '../models/admin.model';
import { error } from 'console';
import { updatedIsVerified } from '../utils/verify.utils';
import { decode } from 'punycode';



export const register = async (req: Request, res: Response,mode:any) => {
  try {
    // const {firstName,lastName,email, password} = req.body;
    // if(!firstName || !lastName || email || !password){
    //   return res.status(401).json({
    //     success:false,
    //     message:'Required field missed',
    //     error:error instanceof Error?error.message:error
    //   }) ;
    // }
    const data = await registerUser(req.body,mode);
    const token = generateToken(data._id)
    // await sendVerificationEmail(data.firstName, token);

    await sendVerificationEmail({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email
    }, token);


    return res.status(201).json({
      success:true,
      message:"created",
      data:data,
      token: token
    });
  } catch (error) {
    res.status(400).json({ 
      success:false,
      message: 'Internal server error',
      error:error instanceof Error?error.message:error
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const token = await loginUser(req.body);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ message : "401" });
  }
};


// auth.controller.ts




export const verifyEmail = async (req: Request, res: Response) => {
  const token = req.params.token;
  const admin = Admin;
  try {
    // Decode and verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    // Find the admin by ID and update isVerified to true
    const updatedAdmin = await updatedIsVerified(req,res,admin,decoded);
    // const updatedAdmin = await Admin.findByIdAndUpdate(
    //   decoded.id,
    //   { isVerified: true },
    //   { new: true }
    // );

    if (!updatedAdmin) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Email verified successfully",
      user: updatedAdmin,
    });

  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

