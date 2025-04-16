import { Request, Response } from "express";
import { JobHistory } from "../models/jobHistory.model"; // Adjust path based on your project

// Create Job History Entry
const createJobHistory = async (req: Request, res: Response) => {
    try {
        const { jobId, freelancerId, clientId, action } = req.body;

        if (!jobId || !freelancerId || !clientId || !action) {
            return res.status(400).json({
                success: false,
                message: "All fields are required: jobId, freelancerId, clientId, action",
            });
        }

        const newEntry = new JobHistory({
            jobId,
            freelancerId,
            clientId,
            action,
        });

        await newEntry.save();

        return res.status(201).json({
            success: true,
            message: "Job history entry created successfully",
            data: newEntry,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get All Job History
const getAllJobHistories = async (req: Request, res: Response) => {
    try {
        const history = await JobHistory.find()
            .populate("jobId", "title")
            .populate("freelancerId", "name email")
            .populate("clientId", "name email");

        return res.status(200).json({
            success: true,
            message: "Job history fetched successfully",
            data: history,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get History by Job ID
const getJobHistoryByJobId = async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params;

        const history = await JobHistory.find({ jobId })
            .populate("freelancerId", "name email")
            .populate("clientId", "name email");

        if (!history || history.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No history found for this job",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Job history fetched successfully",
            data: history,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// (Optional) Delete History by ID
const deleteJobHistoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const existing = await JobHistory.findById(id);
        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "History entry not found",
            });
        }

        await JobHistory.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "History entry deleted successfully",
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
    createJobHistory,
    getAllJobHistories,
    getJobHistoryByJobId,
    deleteJobHistoryById, // Optional
};
