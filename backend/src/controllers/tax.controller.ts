import { Request, Response } from "express";
import { Tax } from "../models/tax.model";

// Create a new tax record
const createTax = async (req: Request, res: Response) => {
  try {
    const { userId, amount, taxRate } = req.body;

    if (!userId || !amount || !taxRate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    // Calculate total tax
    const totalTax = (amount * taxRate) / 100;

    const newTax = new Tax({
      userId,
      amount,
      taxRate,
      totalTax,
    });

    await newTax.save();

    return res.status(201).json({
      success: true,
      message: "Tax record created successfully",
      data: newTax,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all tax records
const getAllTaxes = async (_req: Request, res: Response) => {
  try {
    const taxes = await Tax.find().populate("userId");

    return res.status(200).json({
      success: true,
      message: "All tax records fetched",
      data: taxes,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get a tax record by userId
const getTaxByUser = async (req: Request, res: Response) => {
  try {
    const tax = await Tax.findOne({ userId: req.params.userId });

    if (!tax) {
      return res.status(404).json({
        success: false,
        message: "No tax record found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tax record fetched successfully",
      data: tax,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update a tax record (e.g., change tax rate or amount)
const updateTax = async (req: Request, res: Response) => {
  try {
    const { amount, taxRate } = req.body;

    if (!amount || !taxRate) {
      return res.status(400).json({
        success: false,
        message: "Amount and tax rate are required to update",
      });
    }

    // Calculate new total tax
    const totalTax = (amount * taxRate) / 100;

    const updatedTax = await Tax.findByIdAndUpdate(
      req.params.id,
      { amount, taxRate, totalTax },
      { new: true }
    );

    if (!updatedTax) {
      return res.status(404).json({
        success: false,
        message: "Tax record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tax record updated successfully",
      data: updatedTax,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a tax record
const deleteTax = async (req: Request, res: Response) => {
  try {
    const deletedTax = await Tax.findByIdAndDelete(req.params.id);

    if (!deletedTax) {
      return res.status(404).json({
        success: false,
        message: "Tax record not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Tax record deleted successfully",
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
  createTax,
  getAllTaxes,
  getTaxByUser,
  updateTax,
  deleteTax,
};
