import express, { Request, Response } from 'express';
import conversationController from '../controllers/conversation.controller';

const router = express.Router();

const {
  getConversations,
  getConversationById,
  createConversation,
  updateConversation,
  deleteConversation,
} = conversationController;

router.get('/conversations', async (req: Request, res: Response) => {
  try {
    await getConversations(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get('/conversations/:id', async (req: Request, res: Response) => {
  try {
    await getConversationById(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.post('/conversations', async (req: Request, res: Response) => {
  try {
    await createConversation(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.put('/conversations/:id', async (req: Request, res: Response) => {
  try {
    await updateConversation(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.delete('/conversations/:id', async (req: Request, res: Response) => {
  try {
    await deleteConversation(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
