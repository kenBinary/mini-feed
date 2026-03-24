# Mini Feed

mini video feed application built with a React frontend and an Express/Prisma PostgreSQL (Neon) backend.

## Frontend

The frontend is a React application built with Vite and Tailwind CSS. It features a  vertical swipeable video feed and uses React Query for data fetching and Intersection Observer for optimized video playback.

### Setup Instructions

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   Make sure you have `pnpm` installed.
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the `frontend` directory based on `.env.example`:
   ```env
   VITE_API_DOMAIN=http://localhost:3000
   ```

4. **Start the development server:**
   ```bash
   pnpm dev
   ```
   The application will be available at `http://localhost:5173` (or the port specified by Vite).

### Architecture Decisions and Why

**Feature-Based Architecture**
The frontend follows a feature-based folder structure rather. Grouping by feature keeps related components, hooks, and utilities closely co-located. This makes the codebase much easier to navigate and scale, as each feature acts as an independent module. When working on the "feed" feature, all necessary context is in one place, reducing cognitive load and tightly coupling related logic.

### What I'd Improve Over Time

- Currently new batches of 4 videos are fetched everytime the user is is in the 2nd to the last video. This is very rudimentary, in the future this would be dynamic based on factors such as video retention, and scroll speed. 
- I would also add unit tests for better maintainability.
- Establish conventions, patterns, and architecture so that other developers can will follow and contribute to the codebase in a structured manner.

---

## Backend

The backend is a Node.js Express application utilizing Prisma ORM with a Neon PostgreSQL database.

### Setup Instructions

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   pnpm install
   ```

3. **Environment Setup:**
   Create a `.env` file in the `backend` directory based on `.env.example`:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@ep-xxx.neon.tech/neondb?sslmode=require&channel_binding=require"
   DIRECT_URL="postgresql://USER:PASSWORD@ep-xxx.neon.tech/neondb?sslmode=require&channel_binding=require"
   PORT=3000
   CORS=somedomain.com
   ```

4. **Database Setup and Seeding:**
   Run Prisma db push or migrations, and seed the database with initial mock data:
   ```bash
   pnpm db:seed
   ```

5. **Start the development server:**
   ```bash
   pnpm dev
   ```
   The backend will start and watch for changes using `tsx`.

### Architecture Decisions and Why

**Layered Architecture (API, Service, Repository)**
The backend is structured using a strict layered architecture pattern.

- Separating concerns into distinct layers (Controllers/API, Business Logic/Services, Data Access/Repositories) significantly improves maintainability and testability.
  - The **API Layer** handles HTTP requests and responses cleanly.
  - The **Service Layer** encapsulates all business rules, ensuring they are independent of the web framework.
  - The **Repository Layer** abstracts database interactions (Prisma), allowing the database technology to be swapped or mocked in tests without affecting the rest of the application.

### What I'd Improve Over Time

- Currently the api handles rate limiting at a very basic level, in the future this would be improved to use algorithms such as Fixed Window, Token Bucket, or Leaky Bucket. 
- I would also explore how to combine both rate limiting and throttling.
- I would also add unit tests for better maintainability.
- Establish conventions, patterns, and architecture so that other developers can will follow and contribute to the codebase in a structured manner.

