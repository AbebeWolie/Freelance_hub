import { Request, Response } from "express";
import { Job } from "../models/job.model"; // Adjust path based on your structure

// Create Job
const createJob = async (req: Request, res: Response) => {
    try {
        const { title, description, category, budget, clientId } = req.body;

        if (!title || !clientId) {
            return res.status(400).json({
                success: false,
                message: "Title and clientId are required",
            });
        }

        const newJob = new Job({
            title,
            description,
            category,
            budget,
            clientId,
        });

        await newJob.save();

        return res.status(201).json({
            success: true,
            message: "Job successfully created",
            data: newJob,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get All Jobs
const getJobs = async (req: Request, res: Response) => {
    try {
        const jobs = await Job.find()
            .populate("clientId", "name email") // Assuming User has name/email
            .populate("applicants");

        return res.status(200).json({
            success: true,
            message: "Jobs fetched successfully",
            data: jobs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get Job By ID
const getJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id)
            .populate("clientId", "name email")
            .populate("applicants");

        if (!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job fetched successfully",
            data: job,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Update Job By ID
const updateJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedJob = await Job.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        });

        if (!updatedJob) {
            return res.status(404).json({
                success: false,
                message: "Job not found to update",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job updated successfully",
            data: updatedJob,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Delete Job By ID
const deleteJobById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existing = await Job.findById(id);
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Job not found to delete",
            });
        }

        await Job.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Job deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

export {
    createJob,
    getJobs,
    getJobById,
    updateJobById,
    deleteJobById,
};
