import { Request, Response } from 'express';
import Snippet from '../models/Snippet.model';
import mongoose from 'mongoose';
import { claudeService } from '../services/claude.service';

// POST /snippets - Create a new snippet
export const createSnippet = async (req: Request, res: Response) => {
  try {
    const summaryResponse = await claudeService.generateSummary({text: req.body.text});
    const snippet = await (new Snippet({...req.body, summary: summaryResponse.summary}).save());

    res.status(201).json({
      message: 'Snippet created successfully',
      data: snippet,
    });
  } catch (error) {
    let status = 500;
    if(error instanceof mongoose.Error.ValidationError) {
      status = 400;
    }
    
    res.status(status).json({
      message: 'Error creating snippet',
      error: (error as Error).message,
    });
  }
};

// GET /snippets/:id - Get a specific snippet by ID
export const getSnippetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const snippet = await Snippet.findById(id);
    
    // Check if snippet exists
    if (!snippet) {
      res.status(404).json({
        message: 'Snippet not found',
        error: `No snippet found with ID: ${id}`
      });
      return;
    }
    
    res.status(200).json({
      message: 'Snippet retrieved successfully',
      data: snippet,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving snippet',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// GET /snippets - Get all snippets
export const getAllSnippets = async (req: Request, res: Response) => {
  try {
    const snippets = await Snippet.find();
    res.status(200).json({
      message: 'Snippets retrieved successfully',
      data: snippets,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving snippets',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
