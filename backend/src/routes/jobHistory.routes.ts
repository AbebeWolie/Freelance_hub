import express, { Request, Response } from 'express';
import jobHistoryController from '../controllers/jobHistory.controller';

const router = express.Router();

const {
  getAllJobHistories,
  getJobHistoryById,
  createJobHistory,
  deleteJobHistory,
} = jobHistoryController;

router.get('/histories', async (req: Request, res: Response) => {
  try {
    await getAllJobHistories(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get('/histories/:id', async (req: Request, res: Response) => {
  try {
    await getJobHistoryById(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.post('/histories', async (req: Request, res: Response) => {
  try {
    await createJobHistory(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.delete('/histories/:id', async (req: Request, res: Response) => {
  try {
    await deleteJobHistory(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
