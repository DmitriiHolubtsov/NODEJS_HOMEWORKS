# NODEJS_HOMEWORKS

## RESTful API for Blog with protected resources

## Project structure:

#### - src/
#### -- controllers/            # Logic for handling requests
#### --- authController.js      # Authentication-related logic (register, login, etc.)
#### --- postController.js      # CRUD operations for posts
#### --- commentController.js   # CRUD operations for comments (optional)
#### -- middleware/             # Custom middleware
#### --- authMiddleware.js      # JWT verification middleware
#### -- models/                 # Mongoose schemas
#### --- User.js                # User schema (username, email, password, refreshToken)
#### --- Post.js                # Post schema (title, content, owner)
#### --- Comment.js             # Comment schema (text, author, post)
#### -- routes/                 # API route definitions
#### --- authRoutes.js          # Authentication routes
#### --- postRoutes.js          # Post-related routes
#### --- commentRoutes.js       # Comment-related routes (optional)
#### -- db.js                   # MongoDB connection setup
#### -- server.js               # Main server file
#### -- .env                    # Environment variables (secrets, config)
#### -- nodemon.json            # Nodemon configuration for development

## Description:

### - Controllers: Contain the business logic for each endpoint (e.g., creating a post, logging in).
### - Middleware: Includes authMiddleware.js to protect routes by verifying JWTs.
### - Models: Define the MongoDB schemas using Mongoose.
### - Routes: Define the API endpoints and map them to controller functions.
### - db.js: Handles MongoDB connection.
### - server.js: Initializes the Express app and mounts routes.
### - .env: Stores sensitive configuration (e.g., JWT secrets, MongoDB URI).
### - nodemon.json: Configures Nodemon to watch files during development.

## How to Install Dependencies and Start the Server:

### Prerequisites
### - Node.js: Version 14.x or higher.
### - MongoDB: Either a local instance or MongoDB Atlas (cloud-hosted).
### - Git: For version control (optional).

## Installation:

### 1. Clone repo:
### git clone <repository-url>
### cd <repository-directory>

### 2. Install Dependencies:
### npm install
#### This installs required packages (express, mongoose, jsonwebtoken, bcryptjs, cors, dotenv, nodemon).

### 3. Set Up Environment Variables: Create a .env file in the src/ directory with the following content:
### ORT=5001
### MONGO_URI=mongodb://localhost:27017/myApi  # Replace with your MongoDB URI
### ACCESS_TOKEN_SECRET=yourAccessTokenSecret  # Replace with a secure secret
### REFRESH_TOKEN_SECRET=yourRefreshTokenSecret # Replace with a secure secret

### 4. Start the Server:
### npm run dev
#### The server will run on http://localhost:5001 (or the specified PORT).

### 5. Verify Setup:
### MongoDB connected
### Server running on port 5001
#### If there’s an error, check your MongoDB URI or ensure MongoDB is running.

## Detailed Description of API Endpoints.

## Authentication Endpoints:

### POST /api/auth/register
#### Description: Registers a new user and returns access and refresh tokens.

### Request Body:
#### {
  #### "username": "john_doe",
  #### "email": "john@example.com",
  #### "password": "securepassword123"
#### }

### Response (201 Created):
#### {
  #### "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  #### "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
#### }

### Error (400 Bad Request):
#### { "message": "User already exists" }


### POST /api/auth/login
#### Description: Logs in a user and returns access and refresh tokens.

### Request Body:
#### {
  #### "email": "john@example.com",
  #### "password": "securepassword123"
#### }

### Response (200 OK):
#### {
  #### "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  #### "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
#### }

### Error (400 Bad Request):
#### { "message": "Invalid credentials" }


### POST /api/auth/refresh-token
#### Description: Generates a new access token using a refresh token.

### Request Body:
#### {
  #### "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
#### }

### Response (200 OK):
#### {
  #### "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
#### }

### Error (403 Forbidden):
#### { "message": "Invalid refresh token" }


### POST /api/auth/logout
#### Description: Logs out a user by invalidating their refresh token.

### Request Body:
#### {
  #### "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
#### }

### Response (200 OK):
#### { "message": "Logged out successfully" }

### Error (400 Bad Request):
#### { "message": "No active session" }


## Post Endpoints (Protected)
### Authorization Header: All endpoints require Authorization: Bearer <accessToken>.

### GET /api/posts
#### Description: Retrieves all posts created by the authenticated user.

### Response (200 OK):
#### [
####     {
####     "_id": "603d9f8e4f1b2c001c8b4567",
####     "title": "My First Post",
####     "content": "This is my first blog post!",
####     "owner": {
####     "_id": "603d9f8e4f1b2c001c8b4566",
####     "username": "john_doe",
####     "email": "john@example.com"
####     },
####     "createdAt": "2025-02-26T10:00:00.000Z",
####     "updatedAt": "2025-02-26T10:00:00.000Z"
####   }
#### ]

### GET /api/posts/:id
#### Description: Retrieves a specific post by ID (only if owned by the user).
### Example: GET /api/posts/603d9f8e4f1b2c001c8b4567

### Response (200 OK):
#### {
####   "_id": "603d9f8e4f1b2c001c8b4567",
####   "title": "My First Post",
####   "content": "This is my first blog post!",
####   "owner": "603d9f8e4f1b2c001c8b4566",
####   "createdAt": "2025-02-26T10:00:00.000Z",
####   "updatedAt": "2025-02-26T10:00:00.000Z"
#### }

### Error (404 Not Found):
#### { "message": "Post not found or not authorized" }

### POST /api/posts
#### Description: Creates a new post for the authenticated user.

### Request Body:
#### {
####   "title": "My Second Post",
####   "content": "This is another blog post."
#### }

### Response (201 Created):
#### {
####   "_id": "603d9f8e4f1b2c001c8b4568",
####   "title": "My Second Post",
####   "content": "This is another blog post.",
####   "owner": "603d9f8e4f1b2c001c8b4566",
####   "createdAt": "2025-02-26T10:05:00.000Z",
####   "updatedAt": "2025-02-26T10:05:00.000Z"
#### }

### PUT /api/posts/:id
#### Description: Updates a post by ID (only if owned by the user).
### Example: PUT /api/posts/603d9f8e4f1b2c001c8b4568

### Request Body:
#### {
####   "title": "Updated Post",
####   "content": "This post has been updated."
#### }

### Response (200 OK):
#### {
####   "_id": "603d9f8e4f1b2c001c8b4568",
####   "title": "Updated Post",
####   "content": "This post has been updated.",
####   "owner": "603d9f8e4f1b2c001c8b4566",
####   "createdAt": "2025-02-26T10:05:00.000Z",
####   "updatedAt": "2025-02-26T10:10:00.000Z"
#### }

### Error (404 Not Found):
#### { "message": "Post not found or not authorized" }

### DELETE /api/posts/:id
### Description: Deletes a post by ID (only if owned by the user).
### Example: DELETE /api/posts/603d9f8e4f1b2c001c8b4568
### Response (200 OK):
#### { "message": "Post removed" }

### Error (404 Not Found):
#### { "message": "Post not found or not authorized" }

## Comment Endpoints (Optional, Protected)
### Authorization Header: Requires Authorization: Bearer <accessToken>.

### POST /api/comments
#### Description: Adds a comment to a post.

### Request Body:
#### {
####   "text": "Great post!",
####   "postId": "603d9f8e4f1b2c001c8b4567"
#### }

### Response (201 Created):
#### {
####  "_id": "603d9f8e4f1b2c001c8b4569",
####   "text": "Great post!",
####   "author": "603d9f8e4f1b2c001c8b4566",
####   "post": "603d9f8e4f1b2c001c8b4567",
####   "createdAt": "2025-02-26T10:15:00.000Z",
####   "updatedAt": "2025-02-26T10:15:00.000Z"
#### }

### GET /api/comments/:postId
#### Description: Retrieves all comments for a specific post.
### Example: GET /api/comments/603d9f8e4f1b2c001c8b4567

### Response (200 OK):
#### [
####   {
####     "_id": "603d9f8e4f1b2c001c8b4569",
####     "text": "Great post!",
####     "author": {
####       "_id": "603d9f8e4f1b2c001c8b4566",
####       "username": "john_doe",
####       "email": "john@example.com"
####     },
####     "post": "603d9f8e4f1b2c001c8b4567",
####     "createdAt": "2025-02-26T10:15:00.000Z",
####     "updatedAt": "2025-02-26T10:15:00.000Z"
####  }
#### ]

### PUT /api/comments/:id
#### Description: Updates a comment by ID (only if owned by the user).
### Example: PUT /api/comments/603d9f8e4f1b2c001c8b4569

### Request Body:
#### {"text": "Really great post!"}

### Response (200 OK):
#### {
####   "_id": "603d9f8e4f1b2c001c8b4569",
####   "text": "Really great post!",
####   "author": "603d9f8e4f1b2c001c8b4566",
####   "post": "603d9f8e4f1b2c001c8b4567",
####   "createdAt": "2025-02-26T10:15:00.000Z",
####   "updatedAt": "2025-02-26T10:20:00.000Z"
#### }

### Error (403 Forbidden):
#### { "message": "Access denied" }

### DELETE /api/comments/:id
### Description: Deletes a comment by ID (only if owned by the user).
### Example: DELETE /api/comments/603d9f8e4f1b2c001c8b4569

### Response (200 OK):
#### { "message": "Comment deleted successfully" }

### Error (403 Forbidden):
#### { "message": "Access denied" }


## Overview of JWT and User Sessions

### How JWT Works in This Project

## Token Generation:
### 1. On register or login, the server generates:
### 2. An access token (short-lived, e.g., 15 minutes) with userId and username.
### 3. A refresh token (long-lived, e.g., 7 days) with userId.
### 4. Tokens are signed with secrets (ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET).

## Token Usage:
### 1. The client includes the access token in the Authorization header (Bearer <token>) for protected routes.
### 2. The protect middleware verifies the token’s signature and expiration, setting req.user with the payload.
### 3. Token Refresh:
### 4. When the access token expires, the client sends the refresh token to /api/auth/refresh-token to get a new access token.

## Logout:
### 1. The refresh token is cleared from the database, invalidating the session.

## Client-Side Session with JWT:
### Implementation: The client stores the access and refresh tokens (e.g., in localStorage or cookies).

## Flow:
### 1. User logs in - receives tokens.
### 2. Client sends access token with each API request.
### 3. If the access token expires (401 response), the client uses the refresh token to get a new one.
### 4. On logout, the refresh token is invalidated, ending the session.

## Advantages:

### - Stateless: No server-side session storage needed.
### - Scalable: Works across multiple servers without a shared session store.
### - Secure: Tokens are signed and can include expiration.
### - Alternatives to JWT
### - Session-Based Authentication:
### 1. Uses server-side sessions with cookies.
### 2. Better for small-scale apps with simpler revocation needs.

## OAuth/OIDC:
### External identity providers (e.g., Google) issue tokens.
### Suitable for third-party authentication.