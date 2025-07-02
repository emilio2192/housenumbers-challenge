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

// Create a test app
const app = express();
app.use(express.json());
app.use('/snippets', snippetsRouter);

describe('Snippets API Endpoints', () => {
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
            const invalidData = {
              text: undefined
            };

            const response = await request(app)
                .post('/snippets')
                .send(invalidData)
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('errors');
            expect(Array.isArray(response.body.errors)).toBe(true);
            expect(response.body.errors.length).toBeGreaterThan(0);
        });

        it('should return 400 when text is empty', async () => {
            const invalidData = snippetWithEmptyTextFactory.build();

            const response = await request(app)
                .post('/snippets')
                .send({ text: invalidData.text })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('errors');
            expect(Array.isArray(response.body.errors)).toBe(true);
            expect(response.body.errors.length).toBeGreaterThan(0);
        });

        it('should return 400 when text is only whitespace', async () => {
            const invalidData = snippetWithWhitespaceTextFactory.build();

            const response = await request(app)
                .post('/snippets')
                .send({ text: invalidData.text })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('errors');
            expect(Array.isArray(response.body.errors)).toBe(true);
            expect(response.body.errors.length).toBeGreaterThan(0);
        });

        it('should return 400 when text is too short', async () => {
            const invalidData = snippetWithShortTextFactory.build();

            const response = await request(app)
                .post('/snippets')
                .send({ text: invalidData.text })
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(response.body).toHaveProperty('errors');
            expect(Array.isArray(response.body.errors)).toBe(true);
            expect(response.body.errors.length).toBeGreaterThan(0);
        });

        it('should return 500 when server error occurs', async () => {
            const snippetData = createSnippetRequestFactory.build();

            const response = await request(app)
                .post('/snippets')
                .send(snippetData)
                .expect(500);

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('GET /snippets/:id', () => {
        it('should retrieve a specific snippet by ID successfully', async () => {
            const mockSnippet: Snippet = snippetFactory.build();
            const snippetId = mockSnippet.id;

            const response = await request(app)
                .get(`/snippets/${snippetId}`)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Snippet retrieved successfully');
            expect(response.body).toHaveProperty('data');
            expect(response.body.data).toHaveProperty('id', snippetId);
            expect(response.body.data).toHaveProperty('text');
            expect(response.body.data).toHaveProperty('summary');
            expect(typeof response.body.data.text).toBe('string');
            expect(typeof response.body.data.summary).toBe('string');
            expect(response.body.data.text.length).toBeGreaterThan(0);
            
            // Direct equality comparison with mock data
            expect(response.body.data).toEqual(mockSnippet);
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
            const nonExistentId = 'non-existent-id';

            const response = await request(app)
                .get(`/snippets/${nonExistentId}`)
                .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(response.body.message).toContain('not found');
            expect(typeof response.body.message).toBe('string');
        });

        it('should return 500 when server error occurs', async () => {
            const mockSnippet: Snippet = snippetFactory.build();
            const snippetId = mockSnippet.id;

            const response = await request(app)
                .get(`/snippets/${snippetId}`)
                .expect(500);

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('GET /snippets', () => {
        it('should retrieve all snippets successfully', async () => {
            const mockSnippets: Snippet[] = snippetFactory.buildList(3);

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
            
            // Direct equality comparison with mock data
            expect(response.body.data).toEqual(mockSnippets);
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
            const response = await request(app)
                .get('/snippets')
                .expect(500);

            expect(response.body).toHaveProperty('message');
        });
    });

    describe('General API Tests', () => {
        it('should return 404 for non-existent routes', async () => {
            const response = await request(app)
                .get('/snippets/nonexistent/route')
                .expect(404);

            expect(response.body).toHaveProperty('message');
            expect(typeof response.body.message).toBe('string');
        });

        it('should handle malformed JSON in request body', async () => {
            const response = await request(app)
                .post('/snippets')
                .set('Content-Type', 'application/json')
                .send('{"invalid": json}')
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(typeof response.body.message).toBe('string');
        });

        it('should handle requests with wrong content type', async () => {
            const response = await request(app)
                .post('/snippets')
                .set('Content-Type', 'text/plain')
                .send('plain text')
                .expect(400);

            expect(response.body).toHaveProperty('message');
            expect(typeof response.body.message).toBe('string');
        });
    });
}); 