import { Request, Response } from "express";
import { TimeTracking } from "../models/timeTracking.model";

// Create a new time tracking record
const createTimeTracking = async (req: Request, res: Response) => {
  try {
    const { jobId, freelancerId, startTime, endTime, totalHours } = req.body;

    if (!jobId || !freelancerId || !startTime || !endTime || !totalHours) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Create a new time tracking record
    const newTimeTracking = new TimeTracking({
      jobId,
      freelancerId,
      startTime,
      endTime,
      totalHours,
    });

    await newTimeTracking.save();

    return res.status(201).json({
      success: true,
      message: "Time tracking record created successfully",
      data: newTimeTracking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all time tracking records
const getAllTimeTracking = async (_req: Request, res: Response) => {
  try {
    const timeTrackingRecords = await TimeTracking.find()
      .populate("jobId freelancerId");

    return res.status(200).json({
      success: true,
      message: "All time tracking records fetched",
      data: timeTrackingRecords,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get time tracking records for a specific freelancer or job
const getTimeTrackingByFreelancer = async (req: Request, res: Response) => {
  try {
    const timeTracking = await TimeTracking.find({ freelancerId: req.params.freelancerId })
      .populate("jobId freelancerId");

    if (!timeTracking || timeTracking.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No time tracking records found for this freelancer",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Time tracking records fetched successfully",
      data: timeTracking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get time tracking records for a specific job
const getTimeTrackingByJob = async (req: Request, res: Response) => {
  try {
    const timeTracking = await TimeTracking.find({ jobId: req.params.jobId })
      .populate("jobId freelancerId");

    if (!timeTracking || timeTracking.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No time tracking records found for this job",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Time tracking records fetched successfully",
      data: timeTracking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a time tracking record
const updateTimeTracking = async (req: Request, res: Response) => {
  try {
    const { startTime, endTime, totalHours } = req.body;

    if (!startTime || !endTime || !totalHours) {
      return res.status(400).json({
        success: false,
        message: "Start time, end time, and total hours are required to update",
      });
    }

    const updatedTimeTracking = await TimeTracking.findByIdAndUpdate(
      req.params.id,
      { startTime, endTime, totalHours },
      { new: true }
    );

    if (!updatedTimeTracking) {
      return res.status(404).json({
        success: false,
        message: "Time tracking record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Time tracking record updated successfully",
      data: updatedTimeTracking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a time tracking record
const deleteTimeTracking = async (req: Request, res: Response) => {
  try {
    const deletedTimeTracking = await TimeTracking.findByIdAndDelete(req.params.id);

    if (!deletedTimeTracking) {
      return res.status(404).json({
        success: false,
        message: "Time tracking record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Time tracking record deleted successfully",
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
  createTimeTracking,
  getAllTimeTracking,
  getTimeTrackingByFreelancer,
  getTimeTrackingByJob,
  updateTimeTracking,
  deleteTimeTracking,
};
