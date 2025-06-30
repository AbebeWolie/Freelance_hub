import express, { Request, Response } from 'express';
import bookmarkController from '../controllers/bookMark.controller';

const router = express.Router();

const {
  getBookmarks,
  getBookmarkById,
  createBookmark,
  deleteBookmarkById,
} = bookmarkController;

router.get('/bookmarks', async (req: Request, res: Response) => {
  try {
    await getBookmarks(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get('/bookmarks/:id', async (req: Request, res: Response) => {
  try {
    await getBookmarkById(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.post('/bookmarks', async (req: Request, res: Response) => {
  try {
    await createBookmark(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.delete('/bookmarks/:id', async (req: Request, res: Response) => {
  try {
    await deleteBookmarkById(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
