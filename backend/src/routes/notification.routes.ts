import express, { Request, Response } from 'express';
import notificationController from '../controllers/notification.controller';

const router = express.Router();

const {
  getUserNotifications,
  createNotification,
  markNotificationAsRead,
  deleteNotification,
} = notificationController;

// Get notifications for a user
router.get('/users/:userId/notifications', async (req: Request, res: Response) => {
  try {
    await getUserNotifications(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Create a new notification
router.post('/notifications', async (req: Request, res: Response) => {
  try {
    await createNotification(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Mark a notification as read
router.put('/notifications/:id/read', async (req: Request, res: Response) => {
  try {
    await markNotificationAsRead(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Delete a notification
router.delete('/notifications/:id', async (req: Request, res: Response) => {
  try {
    await deleteNotification(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
