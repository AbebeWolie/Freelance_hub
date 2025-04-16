import { Request, Response } from "express";
import { Withdrawal } from "../models/withdrawal.model";

// Create a new withdrawal request
const createWithdrawal = async (req: Request, res: Response) => {
  try {
    const { freelancerId, amount, method } = req.body;

    if (!freelancerId || !amount || !method) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Create a new withdrawal request
    const newWithdrawal = new Withdrawal({
      freelancerId,
      amount,
      method,
      status: "pending", // Default status is pending
    });

    await newWithdrawal.save();

    return res.status(201).json({
      success: true,
      message: "Withdrawal request created successfully",
      data: newWithdrawal,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all withdrawal requests
const getAllWithdrawals = async (_req: Request, res: Response) => {
  try {
    const withdrawals = await Withdrawal.find().populate("freelancerId");

    return res.status(200).json({
      success: true,
      message: "All withdrawal requests fetched",
      data: withdrawals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get withdrawal request by freelancer
const getWithdrawalsByFreelancer = async (req: Request, res: Response) => {
  try {
    const withdrawals = await Withdrawal.find({ freelancerId: req.params.freelancerId })
      .populate("freelancerId");

    if (!withdrawals || withdrawals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No withdrawal requests found for this freelancer",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Withdrawal requests fetched successfully",
      data: withdrawals,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update the status of a withdrawal request (e.g., approve, reject)
const updateWithdrawalStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    const validStatuses = ["pending", "processed", "failed"];

    if (!status || !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status provided. Valid statuses: 'pending', 'processed', 'failed'",
      });
    }

    const updatedWithdrawal = await Withdrawal.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedWithdrawal) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Withdrawal request status updated successfully",
      data: updatedWithdrawal,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a withdrawal request
const deleteWithdrawal = async (req: Request, res: Response) => {
  try {
    const deletedWithdrawal = await Withdrawal.findByIdAndDelete(req.params.id);

    if (!deletedWithdrawal) {
      return res.status(404).json({
        success: false,
        message: "Withdrawal request not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Withdrawal request deleted successfully",
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
  createWithdrawal,
  getAllWithdrawals,
  getWithdrawalsByFreelancer,
  updateWithdrawalStatus,
  deleteWithdrawal,
};
