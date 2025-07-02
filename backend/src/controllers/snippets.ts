import { Request, Response } from 'express';
import Snippet from '../models/Snippet.model';
import mongoose from 'mongoose';

// POST /snippets - Create a new snippet
export const createSnippet = async (req: Request, res: Response) => {
  try {
    const snippet = await (new Snippet({...req.body, summary: 'Summary created by AI dummy by the moment'}).save());
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
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

// GET /snippets/:id - Get a specific snippet by ID
export const getSnippetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: Add database logic to fetch snippet by ID
    res.status(200).json({
      message: 'Snippet retrieved successfully',
      data: { id, snippet: 'Sample snippet data' },
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
    // TODO: Add database logic to fetch all snippets
    res.status(200).json({
      message: 'Snippets retrieved successfully',
      data: [],
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error retrieving snippets',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
