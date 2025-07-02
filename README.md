# housenumbers-challenge
AI Snippet Service

# Housenumbers Challenge Backend

## Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Anthropic API key

## Environment Variables & Security

For development, a single `backend/.env` file is used for all services (backend, mongo, and mongo-express) to simplify setup. This file contains all required environment variables for the backend app, MongoDB container, and Mongo Express. See `backend/.env.example` for the full list of variables to set.

**Example required variables:**

# Backend app
MONGO_URI=
ANTHROPIC_API_KEY=

# MongoDB container
MONGO_INITDB_ROOT_USERNAME=
MONGO_INITDB_ROOT_PASSWORD=
MONGO_INITDB_DATABASE=

# Mongo Express
ME_CONFIG_MONGODB_ADMINUSERNAME=
ME_CONFIG_MONGODB_ADMINPASSWORD=
ME_CONFIG_MONGODB_SERVER=
ME_CONFIG_MONGODB_URL=
ME_CONFIG_BASICAUTH_USERNAME=
ME_CONFIG_BASICAUTH_PASSWORD=

> **Note:** This approach is for dev simplicity. For production, it is recommended to use separate env files for each service to improve security and clarity.

Never commit your real `.env` file or secrets to version control. Use `.env.example` to document required variables for collaborators.

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


## Post-challenge Reflection

### Backend
#### Improvements
- Apply some validator like zod to improve the process, now the DB handle the validation of the data
#### Missing
- Implements JWT
- Streaming AI summary via SSE
