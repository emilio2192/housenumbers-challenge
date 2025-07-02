import express from 'express';
import { createSnippet, getSnippetById, getAllSnippets } from '../controllers/snippets';
import { validateObjectId } from '../middleware/validation';

const router = express.Router();

// POST /snippets - Create a new snippet
router.post('/', createSnippet);

// GET /snippets/:id - Get a specific snippet by ID
router.get('/:id', validateObjectId('id'), getSnippetById);

// GET /snippets - Get all snippets
router.get('/', getAllSnippets);

export default router;
