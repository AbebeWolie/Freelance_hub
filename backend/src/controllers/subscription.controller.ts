import { Request, Response } from "express";
import { Subscription } from "../models/subscription.model";

// Create a new subscription
const createSubscription = async (req: Request, res: Response) => {
  try {
    const { userId, plan, startDate, endDate } = req.body;

    if (!userId || !plan || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newSubscription = new Subscription({
      userId,
      plan,
      startDate,
      endDate,
      status: "active", // Default status
    });

    await newSubscription.save();

    return res.status(201).json({
      success: true,
      message: "Subscription created successfully",
      data: newSubscription,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all subscriptions
const getAllSubscriptions = async (_req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.find().populate("userId");

    return res.status(200).json({
      success: true,
      message: "All subscriptions fetched",
      data: subscriptions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get a subscription by userId
const getSubscriptionByUser = async (req: Request, res: Response) => {
  try {
    const subscription = await Subscription.findOne({ userId: req.params.userId });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found for this user",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription fetched",
      data: subscription,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Update subscription status (e.g., activate, deactivate, cancel)
const updateSubscriptionStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    if (!status || !["active", "inactive", "cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status provided",
      });
    }

    const updatedSubscription = await Subscription.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!updatedSubscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription status updated",
      data: updatedSubscription,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a subscription
const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!deletedSubscription) {
      return res.status(404).json({
        success: false,
        message: "Subscription not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscription deleted successfully",
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
  createSubscription,
  getAllSubscriptions,
  getSubscriptionByUser,
  updateSubscriptionStatus,
  deleteSubscription,
};
