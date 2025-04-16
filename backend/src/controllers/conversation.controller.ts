import { Request, Response } from "express";
import { Conversation } from "../models/conversation.model";

// Create a new conversation
const createConversation = async (req: Request, res: Response) => {
    try {
        const { members, lastMessage } = req.body;

        if (!members || !Array.isArray(members) || members.length < 2) {
            return res.status(400).json({
                success: false,
                message: "At least two members are required to start a conversation",
            });
        }

        const newConversation = new Conversation({
            members,
            lastMessage,
            lastUpdated: new Date(),
        });

        await newConversation.save();

        return res.status(201).json({
            success: true,
            message: "Conversation successfully created",
            data: newConversation,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get all conversations
const getConversations = async (req: Request, res: Response) => {
    try {
        const conversations = await Conversation.find().populate("members");

        if (conversations.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No conversations found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Conversations successfully fetched",
            data: conversations,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get conversation by ID
const getConversationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const conversation = await Conversation.findById(id).populate("members");

        if (!conversation) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Conversation successfully fetched",
            data: conversation,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Delete conversation by ID
const deleteConversationById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const existing = await Conversation.findById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Conversation not found to delete",
            });
        }

        await Conversation.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Conversation successfully deleted",
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
    createConversation,
    getConversations,
    getConversationById,
    deleteConversationById,
};


