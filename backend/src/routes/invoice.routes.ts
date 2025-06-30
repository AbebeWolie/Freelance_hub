import express, { Request, Response } from 'express';
import invoiceController from '../controllers/invoice.controller';

const router = express.Router();

const {
  getInvoices,
  getInvoiceById,
  createInvoice,
  updateInvoice,
  deleteInvoice,
} = invoiceController;

router.get('/invoices', async (req: Request, res: Response) => {
  try {
    await getInvoices(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.get('/invoices/:id', async (req: Request, res: Response) => {
  try {
    await getInvoiceById(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.post('/invoices', async (req: Request, res: Response) => {
  try {
    await createInvoice(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.put('/invoices/:id', async (req: Request, res: Response) => {
  try {
    await updateInvoice(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

router.delete('/invoices/:id', async (req: Request, res: Response) => {
  try {
    await deleteInvoice(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
