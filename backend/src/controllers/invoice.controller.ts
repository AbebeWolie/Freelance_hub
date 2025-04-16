import { Request, Response } from "express";
import { Invoice } from "../models/invoice.model";

// Create Invoice
const createInvoice = async (req: Request, res: Response) => {
    try {
        const { paymentId, amount, issuedTo, issuedBy, dueDate } = req.body;

        if (!paymentId || !amount || !issuedTo || !issuedBy || !dueDate) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const newInvoice = new Invoice({
            paymentId,
            amount,
            issuedTo,
            issuedBy,
            dueDate,
        });

        await newInvoice.save();

        return res.status(201).json({
            success: true,
            message: "Invoice successfully created",
            data: newInvoice,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get All Invoices
const getInvoices = async (req: Request, res: Response) => {
    try {
        const invoices = await Invoice.find()
            .populate("paymentId")
            .populate("issuedTo")
            .populate("issuedBy");

        if (invoices.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No invoices found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Invoices successfully fetched",
            data: invoices,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Get Invoice by ID
const getInvoiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id)
            .populate("paymentId")
            .populate("issuedTo")
            .populate("issuedBy");

        if (!invoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Invoice successfully fetched",
            data: invoice,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Delete Invoice
const deleteInvoiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const existing = await Invoice.findById(id);

        if (!existing) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found to delete",
            });
        }

        await Invoice.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Invoice successfully deleted",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error instanceof Error ? error.message : String(error),
        });
    }
};

// Optional: Update Invoice
const updateInvoiceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const updatedInvoice = await Invoice.findByIdAndUpdate(
            id,
            updates,
            { new: true, runValidators: true }
        );

        if (!updatedInvoice) {
            return res.status(404).json({
                success: false,
                message: "Invoice not found to update",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Invoice successfully updated",
            data: updatedInvoice,
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
    createInvoice,
    getInvoices,
    getInvoiceById,
    deleteInvoiceById,
    updateInvoiceById,
};
