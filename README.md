# housenumbers-challenge
AI Snippet Service

# Housenumbers Challenge Backend

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Anthropic API key

## Local Development Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/emilio2192/housenumbers-challenge
   cd housenumbers-challenge/backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` and fill in your MongoDB URI and Anthropic API key.

4. **Start MongoDB (if not using Docker):**
   - Make sure MongoDB is running locally, or use Docker Compose:
     ```sh
     docker-compose up mongo
     ```

5. **Run the backend server:**
   ```sh
   npm run dev
   ```
   The API will be available at [http://localhost:3000](http://localhost:3000).

## Running Tests

- To run all tests:
  ```sh
  npm test
  ```

- To run tests in watch mode:
  ```sh
  npm run test:watch
  ```

- To see test coverage:
  ```sh
  npm run test:coverage
  ```

## API Request Examples

### Create a Snippet

```sh
curl -X POST http://localhost:3000/snippets \
  -H "Content-Type: application/json" \
  -d '{"text": "This is a long blog post draft..."}'
```

### Get a Snippet by ID

```sh
curl http://localhost:3000/snippets/<snippet_id>
```

### List All Snippets

```sh
curl http://localhost:3000/snippets
```

## Obtaining and Setting API Keys

- This project uses the Anthropic Claude API for AI summaries.
- **Sign up** at [https://www.anthropic.com/](https://www.anthropic.com/) to obtain an API key.
- Add your API key to the `.env` file:
  ```
  ANTHROPIC_API_KEY=your_actual_anthropic_api_key_here
  ```
- If you use a different AI provider (OpenAI, Gemini, etc.), update the service and environment variable accordingly.

## Running with Docker Compose

### Development (Hot Reload)

Use this for local development with hot reload (auto-restart on code changes):

```sh
docker-compose -f docker-compose.dev.yml up
```

- **Backend**: http://localhost:3000  
- **Mongo Express**: http://localhost:8081

### Production

Use this for a production-like environment (no hot reload):

```sh
docker-compose up --build
```

- **Backend**: http://localhost:3000  
- **Mongo Express**: http://localhost:8081

---

- MongoDB credentials:
  - Auth username: `admin`
  - Auth password: `admin123`
  - Database: `housenumbers`

---

## Post-challenge Reflection

### Backend
#### Improvements
- Apply some validator like zod to improve the process, now the DB handle the validation of the data
#### Missing
- Implements JWT
- Streaming AI summary via SSE
