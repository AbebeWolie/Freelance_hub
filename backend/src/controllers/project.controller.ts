import { Request, Response } from "express";
import { Project } from "../models/project.model";

// Create a new project
const createProject = async (req: Request, res: Response) => {
  try {
    const { clientId, title, description, budget, status } = req.body;

    if (!clientId || !title || !budget) {
      return res.status(400).json({
        success: false,
        message: "clientId, title, and budget are required",
      });
    }

    const newProject = new Project({
      clientId,
      title,
      description,
      budget,
      status,
    });

    await newProject.save();

    return res.status(201).json({
      success: true,
      message: "Project created successfully",
      data: newProject,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get all projects
const getAllProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().populate("clientId");
    return res.status(200).json({
      success: true,
      message: "Projects fetched successfully",
      data: projects,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : String(error),
    });
  }
};

// Get project by
