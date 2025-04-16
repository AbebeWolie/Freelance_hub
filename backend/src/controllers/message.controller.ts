import { Request, Response } from "express";
import { Message } from "../models/message.model";

// Send a message
const sendMessage = async (req: Request, res: Response) => {
  try {
    const { senderId, receiverId, content, conversationId } = req.body;

    if (!senderId || !receiverId || !content || !conversationId) {
      return res.status(400).json({
        success: false,
        message: "All fields (senderId, receiverId, content, conversationId) are required",
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      content,
      conversationId,
    });

    await newMessage.save();

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data: newMessage,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all messages in a conversation
const getMessagesByConversation = async (req: Request, res: Response) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .populate("senderId", "name email")
      .populate("receiverId", "name email");

    return res.status(200).json({
      success: true,
      message: "Messages retrieved successfully",
      data: messages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Optional: Get message by ID
const getMessageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const message = await Message.findById(id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: message,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Optional: Delete message
const deleteMessageById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deleted = await Message.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Message deleted successfully",
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
  sendMessage,
  getMessagesByConversation,
  getMessageById,
  deleteMessageById,
};
