import { Request, Response } from "express";
import { Review } from "../models/review.model";

// Create a new review
const createReview = async (req: Request, res: Response) => {
  try {
    const { reviewerId, reviewedId, jobId, rating, comment } = req.body;

    if (!reviewerId || !reviewedId || !jobId || !rating) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const newReview = new Review({
      reviewerId,
      reviewedId,
      jobId,
      rating,
      comment,
    });

    await newReview.save();

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      data: newReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all reviews
const getAllReviews = async (_req: Request, res: Response) => {
  try {
    const reviews = await Review.find()
      .populate("reviewerId reviewedId jobId");

    return res.status(200).json({
      success: true,
      message: "All reviews fetched",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get a review by ID
const getReviewById = async (req: Request, res: Response) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate("reviewerId reviewedId jobId");

    if (!review) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review fetched",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all reviews for a specific user (as reviewed)
const getReviewsForUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;

    const reviews = await Review.find({ reviewedId: userId })
      .populate("reviewerId jobId");

    return res.status(200).json({
      success: true,
      message: "User reviews fetched",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Delete a review
const deleteReview = async (req: Request, res: Response) => {
  try {
    const deleted = await Review.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted",
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
  createReview,
  getAllReviews,
  getReviewById,
  getReviewsForUser,
  deleteReview,
};
