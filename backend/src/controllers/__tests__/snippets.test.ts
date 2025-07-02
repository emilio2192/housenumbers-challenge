// Mock the claude service before importing anything else
jest.mock('../../services/claude.service', () => ({
  claudeService: {
    generateSummary: jest.fn(),
    healthCheck: jest.fn(),
    isConfigured: jest.fn()
  }
}));

// Mock the Snippet model
jest.mock('../../models/Snippet.model', () => {
  const originalModule = jest.requireActual('../../models/Snippet.model');
  return {
    __esModule: true,
    default: originalModule.default
  };
});

import request from 'supertest';
import express from 'express';
import snippetsRouter from '../../routes/snippets';
import {
  snippetFactory,
  createSnippetRequestFactory,
  snippetWithShortTextFactory,
  snippetWithEmptyTextFactory,
  snippetWithWhitespaceTextFactory,
} from '../../factories/snippet.factory';
import { Snippet } from '../../types/snippet';
import { claudeService } from '../../services/claude.service';
import SnippetModel from '../../models/Snippet.model';

// Create a test app
const app = express();
app.use(express.json());

// Error handling middleware for JSON parsing errors
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({
      message: 'Invalid JSON format',
      error: 'The request body contains invalid JSON or wrong content type'
    });
    return;
  }
  next(error);
});

app.use('/snippets', snippetsRouter);

// 404 handler for non-existent routes (same as in index.ts)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
    error: `The requested route ${req.originalUrl} does not exist`,
    availableRoutes: [
      "GET /health",
      "POST /snippets",
      "GET /snippets",
      "GET /snippets/:id"
    ]
  });
});

describe('Snippets API Endpoints', () => {
    // Setup and teardown for mocks
    beforeEach(() => {
        jest.clearAllMocks();
        (claudeService.generateSummary as jest.Mock).mockResolvedValue({
            summary: 'Mock summary',
            tokensUsed: 150
        });
        (claudeService.healthCheck as jest.Mock).mockResolvedValue(true);
        (claudeService.isConfigured as jest.Mock).mockReturnValue(true);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    describe('POST /snippets', () => {
        it('should create a new snippet successfully', async () => {
            const snippetData = createSnippetRequestFactory.build();

            const response = await request(app)
                .post('/snippets')
                .send(snippetData)
                .expect(201);

            expect(response.body).toHaveProperty('message', 'Snippet created successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id');
            expect(response.body.data).toHaveProperty('text', snippetData.text);
            expect(response.body.data).toHaveProperty('summary');
            expect(typeof response.body.data.id).toBe('string');
            expect(typeof response.body.data.summary).toBe('string');
        });

        it('should return 400 when text field is missing', async () => {
            const invalidData = {};

            const response = await request(app)
                .post('/snippets')
                .send(invalidData)
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('Text is required');
        });

        it('should return 400 when text is empty', async () => {
            const invalidData = snippetWithEmptyTextFactory.build();

            const response = await request(app)
                .post('/snippets')
                .send({ text: invalidData.text })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('Text is required');
            
        });

        it('should return 400 when text is only whitespace', async () => {
            const invalidData = snippetWithWhitespaceTextFactory.build();

            const response = await request(app)
                .post('/snippets')
                .send({ text: invalidData.text })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('Text is required');
        });

        it('should return 400 when text is too short', async () => {
            const invalidData = snippetWithShortTextFactory.build();

            const response = await request(app)
                .post('/snippets')
                .send({ text: invalidData.text })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('error');
            expect(response.body.error).toContain('Text must be at least 30 characters long');
        });

        it('should return 500 when Claude service fails', async () => {
            const snippetData = createSnippetRequestFactory.build();
            
            // Mock Claude service to fail
            (claudeService.generateSummary as jest.Mock).mockRejectedValue(new Error('Claude API error'));

            const response = await request(app)
                .post('/snippets')
                .send(snippetData)
                .expect(500);

            expect(response.body).toHaveProperty('message', 'Error creating snippet');
            expect(response.body).toHaveProperty('error', 'Claude API error');
        });

        it('should call Claude service with correct parameters', async () => {
            const snippetData = createSnippetRequestFactory.build();
            const expectedSummary = 'Mock summary for testing';
            
            // Mock specific summary response
            (claudeService.generateSummary as jest.Mock).mockResolvedValue({
                summary: expectedSummary,
                tokensUsed: 150
            });

            const response = await request(app)
                .post('/snippets')
                .send(snippetData)
                .expect(201);

            expect(response.body.data.summary).toBe(expectedSummary);
            expect(claudeService.generateSummary).toHaveBeenCalledWith({ text: snippetData.text });
        });

        it('should handle Claude service returning empty summary', async () => {
            const snippetData = createSnippetRequestFactory.build();
            
            // Mock Claude service to throw error for empty summary
            (claudeService.generateSummary as jest.Mock).mockRejectedValue(new Error('Failed to generate summary'));

            const response = await request(app)
                .post('/snippets')
                .send(snippetData)
                .expect(500);

            expect(response.body).toHaveProperty('message', 'Error creating snippet');
            expect(response.body).toHaveProperty('error', 'Failed to generate summary');
        });
    });

    describe('GET /snippets/:id', () => {
        it('should retrieve a specific snippet by ID successfully', async () => {
            // Create a real snippet in the database
            const snippetData = createSnippetRequestFactory.build();
            const snippet = await (new SnippetModel({text: snippetData.text, summary: 'Test summary'}).save());
            const snippetId = snippet.id;

            const response = await request(app)
                .get(`/snippets/${snippetId}`)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Snippet retrieved successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id', snippetId);
            expect(response.body.data).toHaveProperty('text', snippetData.text);
            expect(response.body.data).toHaveProperty('summary', 'Test summary');
            expect(typeof response.body.data.text).toBe('string');
            expect(typeof response.body.data.summary).toBe('string');
            expect(response.body.data.text.length).toBeGreaterThan(0);
        });

        it('should return 400 when ID format is invalid', async () => {
            const invalidId = 'invalid-id';

            const response = await request(app)
                .get(`/snippets/${invalidId}`)
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('error');
            expect(typeof response.body.message).toBe('string');
            expect(typeof response.body.error).toBe('string');
        });

        it('should return 404 when snippet is not found', async () => {
            const nonExistentId = '6864ad41e3dff13d06bc85f9';

            const response = await request(app)
                .get(`/snippets/${nonExistentId}`)
                .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('not found');
            expect(typeof response.body.message).toBe('string');
        });

        it('should return 500 when server error occurs', async () => {
            const snippetId = '6864ad41e3dff13d06bc85f9';
            
            // Mock Snippet.findById to throw an error
            const SnippetModel = require('../../models/Snippet.model').default;
            jest.spyOn(SnippetModel, 'findById').mockRejectedValue(new Error('Database connection error'));

            const response = await request(app)
                .get(`/snippets/${snippetId}`)
                .expect(500);

            expect(response.body).toHaveProperty('message', 'Error retrieving snippet');
            expect(response.body).toHaveProperty('error', 'Database connection error');
        });
    });

    describe('GET /snippets', () => {
        it('should retrieve all snippets successfully', async () => {
            // Create 3 real snippets in the database using factory data
            const snippetData1 = createSnippetRequestFactory.build();
            const snippetData2 = createSnippetRequestFactory.build();
            const snippetData3 = createSnippetRequestFactory.build();

            const snippet1 = await (new SnippetModel({
                text: snippetData1.text,
                summary: 'Summary for snippet 1'
            }).save());

            const snippet2 = await (new SnippetModel({
                text: snippetData2.text,
                summary: 'Summary for snippet 2'
            }).save());

            const snippet3 = await (new SnippetModel({
                text: snippetData3.text,
                summary: 'Summary for snippet 3'
            }).save());

            const response = await request(app)
                .get('/snippets')
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Snippets retrieved successfully');
            expect(response.body).toHaveProperty('data');
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBe(3);

            // Check structure of each snippet in the array
            response.body.data.forEach((snippet: any) => {
                expect(snippet).toHaveProperty('id');
                expect(snippet).toHaveProperty('text');
                expect(snippet).toHaveProperty('summary');
                expect(typeof snippet.id).toBe('string');
                expect(typeof snippet.text).toBe('string');
                expect(typeof snippet.summary).toBe('string');
                expect(snippet.text.length).toBeGreaterThan(0);
            });

            // Verify that our created snippets are in the response
            const snippetIds = response.body.data.map((s: any) => s.id);
            expect(snippetIds).toContain(snippet1.id);
            expect(snippetIds).toContain(snippet2.id);
            expect(snippetIds).toContain(snippet3.id);
        });

        it('should return empty array when no snippets exist', async () => {
            const response = await request(app)
                .get('/snippets')
                .expect(200);

            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toEqual([]);
            expect(response.body.data.length).toBe(0);
        });

        it('should return 500 when server error occurs', async () => {
            // Mock Snippet.find to throw an error
            const SnippetModel = require('../../models/Snippet.model').default;
            jest.spyOn(SnippetModel, 'find').mockRejectedValue(new Error('Database connection error'));

            const response = await request(app)
                .get('/snippets')
                .expect(500);

            expect(response.body).toHaveProperty('error');
        });
    });

    describe('General API Tests', () => {
        it('should return 404 for non-existent routes', async () => {
            const response = await request(app)
                .get('/nonexistent/route')
                .expect(404);
            expect(response.body).toHaveProperty('message', 'Route not found');
            expect(response.body).toHaveProperty('error');
            expect(typeof response.body.error).toBe('string');
        });
    });
}); 