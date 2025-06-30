import express, { Request, Response } from 'express';
import messageController from '../controllers/message.controller';

const router = express.Router();

const {
  getMessagesByConversation,
  sendMessage,
  deleteMessage,
} = messageController;

// Get all messages for a specific conversation
router.get('/conversations/:conversationId/messages', async (req: Request, res: Response) => {
  try {
    await getMessagesByConversation(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Send (create) a new message
router.post('/messages', async (req: Request, res: Response) => {
  try {
    await sendMessage(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Delete a message by ID
router.delete('/messages/:id', async (req: Request, res: Response) => {
  try {
    await deleteMessage(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
