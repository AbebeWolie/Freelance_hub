import { Request, Response } from 'express';
import User from '../models/user.model';
import {login, register} from '../auth/auth.controller';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';



// CREATE USER 

const createUser = async (req: Request, res: Response) => {

    try {
        const user = User
        await register(req,res,user);
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// UPDATE USER

const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const { name, email, password, profile, role } = req.body;
    if (!name || !email || !password || !profile || !role) {
        return res.status(400).json({
            success: false,
            message: "Required fields missed"
        })
    }
    try {
        const exist = await User.findOne({ email })
        if (!exist) {
            return res.status(404).json({
                success: false,
                message: "There is no user to update"
            })
        }

        // find user by id and update

        const update = await User.findByIdAndUpdate(
            userId,
            {
                name,
                email,
                password,
                profile,
                role
            },
            {
                new: true
            })

        if (!update) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User successfully updated",
            user: update
        })

    } catch (error) {
        return res.status(500).json({
            success: true,
            message: "Internal server error",
            error: error
        })
    }

}

// GET ALL USER

const getUser = async (req: Request, res: Response) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User succefully fetched",
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    };
}

// GET USER BY ID

const getUserById = async (req: Request, res: Response) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "User successfully fetched",
            data: user
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// LOGIN AUTHENICATE USER

const loginUser = async (req: Request, res: Response) => {
    await login(req,res);
}




// GET PROFILE

const getProfile = async (req: Request, res: Response) => {
    const userId  = req.params.id;
    if (!userId) {
        return res.status(401).json({
            success: false,
            message: "un Authorized access"
        })
    }
    try {
        const userProfile = await User.findById(userId).select('-password');
        if (!userProfile) {
            return res.status(404).json({
                success: false,
                message: "User profile not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User profile successfully fetched",
            userProfile: userProfile
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }

}

// SEARCH USER

const searchUser = async (req: Request, res: Response) => {
    try {
        const {
            keyword = "",
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "desc"
        } = req.query;
        const searchRegex = new RegExp(keyword as string, "i");
        const filters = {
            $or: [
                { firstName: searchRegex },
                { lastName: searchRegex },
                { email: searchRegex }
            ]
        };
        const sortOptions: any = {
            [sortBy as string]: sortOrder === "asc" ? 1 : -1
        }
        const skip = (Number(page) - 1) * Number(limit);

        const admins = await User.find(filters)
            .sort(sortOptions)
            .skip(skip)
            .limit(Number(limit))
            .select("-password");

        const total = await User.countDocuments(filters);

        return res.status(200).json({
            results: admins,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit))
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server occured while fetchin data",
            error: error instanceof Error ? error.message : String(error),
        });
    }
}


export default {

    createUser,
    updateUser,
    getUser,
    getUserById,
    getProfile,
    loginUser,
    searchUser

}