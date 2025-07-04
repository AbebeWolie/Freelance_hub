import express, { Request, Response } from 'express';
import faqController from '../controllers/faq.controller';

const router = express.Router();

const {
  getFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} = faqController;

router.get('/faqs', async (req: Request, res: Response) => {
  try {
    await getFAQs(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get('/faqs/:id', async (req: Request, res: Response) => {
  try {
    await getFAQById(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.post('/faqs', async (req: Request, res: Response) => {
  try {
    await createFAQ(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.put('/faqs/:id', async (req: Request, res: Response) => {
  try {
    await updateFAQ(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.delete('/faqs/:id', async (req: Request, res: Response) => {
  try {
    await deleteFAQ(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
