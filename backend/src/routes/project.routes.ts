import express, { Request, Response } from 'express';
import projectController from '../controllers/project.controller';

const router = express.Router();

const {
  getClientProjects,
  createProject,
  updateProjectStatus,
  deleteProject,
} = projectController;

// Get all projects for a specific client
router.get('/projects/client/:clientId', async (req: Request, res: Response) => {
  try {
    await getClientProjects(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Create a new project
router.post('/projects', async (req: Request, res: Response) => {
  try {
    await createProject(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Update a project status
router.put('/projects/:id/status', async (req: Request, res: Response) => {
  try {
    await updateProjectStatus(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

// Delete a project
router.delete('/projects/:id', async (req: Request, res: Response) => {
  try {
    await deleteProject(req, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : error,
    });
  }
});

export default router;
