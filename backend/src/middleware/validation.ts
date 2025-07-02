import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';

/**
 * Middleware to validate MongoDB ObjectId format
 */
export const validateObjectId = (paramName: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const id = req.params[paramName];
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({
        message: 'Invalid ID format',
        error: `The provided ${paramName} is not a valid MongoDB ObjectId`
      });
      return;
    }
    
    next();
  };
}; 