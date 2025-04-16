import { Request, Response } from "express";
import { Notification } from "../models/notification.model";

// Create a notification
const createNotification = async (req: Request, res: Response) => {
  try {
    const { userId, type, message } = req.body;

    if (!userId || !type || !message) {
      return res.status(400).json({
        success: false,
        message: "userId, type, and message are required.",
      });
    }

    const newNotification = new Notification({
      userId,
      type,
      message,
    });

    await newNotification.save();

    return res.status(201).json({
      success: true,
      message: "Notification created successfully",
      data: newNotification,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get notifications for a specific user
const getNotificationsByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const notifications = await Notification.find({ userId }).sort({ _id: -1 });

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully",
      data: notifications,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Mark a notification as read
const markAsRead = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const updated = await Notification.findByIdAndUpdate(
      id,
      { read: true },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification marked as read",
      data: updated,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a notification
const deleteNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Notification.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Notification not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notification deleted successfully",
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
  createNotification,
  getNotificationsByUser,
  markAsRead,
  deleteNotification,
};
