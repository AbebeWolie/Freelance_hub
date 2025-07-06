// src/routes/review.routes.ts

import express, { Request, Response } from 'express';
import reviewController from '../controllers/review.controller';

const router = express.Router();

const {
  createReview,
  getJobReviews,
  getUserReviews,
  updateReview,
  deleteReview,
} = reviewController;

// Create a review
router.post('/reviews', async (req: Request, res: Response) => {
  await createReview(req, res);
});

// Get reviews for a specific job
router.get('/job/:jobId', async (req: Request, res: Response) => {
  await getJobReviews(req, res);
});

// Get reviews written by a specific user
router.get('/user/:reviewerId', async (req: Request, res: Response) => {
  await getUserReviews(req, res);
});

// Update a review by ID
router.put('/:id', async (req: Request, res: Response) => {
  await updateReview(req, res);
});

// Delete a review by ID
router.delete('/:id', async (req: Request, res: Response) => {
  await deleteReview(req, res);
});

export default router;
