import { Request, Response } from "express";
import { Payment } from "../models/payment.model";

// Create a new payment
const createPayment = async (req: Request, res: Response) => {
  try {
    const { userId, jobId, amount, method } = req.body;

    if (!userId || !jobId || !amount || !method) {
      return res.status(400).json({
        success: false,
        message: "All fields are required (userId, jobId, amount, method)",
      });
    }

    const payment = new Payment({
      userId,
      jobId,
      amount,
      method,
      status: "pending",
    });

    await payment.save();

    return res.status(201).json({
      success: true,
      message: "Payment created successfully",
      data: payment,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all payments
const getAllPayments = async (_req: Request, res: Response) => {
  try {
    const payments = await Payment.find().populate("userId jobId");
    return res.status(200).json({
      success: true,
      message: "Payments fetched successfully",
      data: payments,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get payment by ID
const getPaymentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const payment = await Payment.findById(id).populate("userId jobId");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment fetched successfully",
      data: payment,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update payment status
const updatePaymentStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["pending", "completed", "failed"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    const payment = await Payment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment status updated",
      data: payment,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a payment
const deletePayment = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Payment.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment deleted successfully",
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
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePaymentStatus,
  deletePayment,
};
