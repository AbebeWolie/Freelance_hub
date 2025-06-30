import express, { Request, Response } from 'express';
import paymentMethodController from '../controllers/payment.controller';

const router = express.Router();

const {
  getUserPaymentMethods,
  addPaymentMethod,
  deletePaymentMethod,
} = paymentMethodController;

// Get all payment methods for a user
router.get('/users/:userId/payment-methods', async (req: Request, res: Response) => {
  try {
    await getUserPaymentMethods(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Add a new payment method
router.post('/payment-methods', async (req: Request, res: Response) => {
  try {
    await addPaymentMethod(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Delete a payment method by ID
router.delete('/payment-methods/:id', async (req: Request, res: Response) => {
  try {
    await deletePaymentMethod(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
