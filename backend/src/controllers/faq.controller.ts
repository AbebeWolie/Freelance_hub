import { Request, Response } from "express";
import { FAQ } from "../models/faq.model";

// Create FAQ
const createFAQ = async (req: Request, res: Response) => {
    try {
        const { question, answer } = req.body;

        if (!question || !answer) {
            return res.status(400).json({
                success: false,
                message: "Both question and answer are required",
            });
        }

        const newFAQ = new FAQ({ question, answer });
        await newFAQ.save();

        return res.status(201).json({
            success: true,
            message: "FAQ successfully created",
            data: newFAQ,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get all FAQs
const getFAQs = async (req: Request, res: Response) => {
    try {
        const faqs = await FAQ.find();

        if (faqs.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No FAQs found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "FAQs successfully fetched",
            data: faqs,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get FAQ by ID
const getFAQById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const faq = await FAQ.findById(id);

        if (!faq) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "FAQ successfully fetched",
            data: faq,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Delete FAQ by ID
const deleteFAQById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const existing = await FAQ.findById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found to delete",
            });
        }

        await FAQ.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "FAQ successfully deleted",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Optional: Update FAQ by ID
const updateFAQById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { question, answer } = req.body;

        const updatedFAQ = await FAQ.findByIdAndUpdate(
            id,
            { question, answer },
            { new: true, runValidators: true }
        );

        if (!updatedFAQ) {
            return res.status(404).json({
                success: false,
                message: "FAQ not found to update",
            });
        }

        return res.status(200).json({
            success: true,
            message: "FAQ successfully updated",
            data: updatedFAQ,
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
    createFAQ,
    getFAQs,
    getFAQById,
    deleteFAQById,
    updateFAQById, // optional
};
