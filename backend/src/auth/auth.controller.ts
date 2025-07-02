import { Request, Response } from 'express';
import { registerUser, loginUser } from './auth.service';
import generateToken from '../utils/jwt.utils';
import { sendVerificationEmail } from '../utils/emailService';


export const register = async (req: Request, res: Response,mode:any) => {
  try {
    
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
