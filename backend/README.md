# User Management Service

This microservice handles user management operations such as registration, login, profile updates, and user deletion. It uses JWT authentication to ensure secure access to protected endpoints.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)

## Features

- **User Registration**: Allows users to register by providing their name, email, password, and role.
- **User Login**: Authenticates users and generates a JWT token for access to protected resources.
- **User Profile**: Allows users to view, update, or delete their profiles.
- **Role-based Access**: Users are assigned roles (`farmer`, `veterinarian`, `admin`) with appropriate permissions.
- **JWT Authentication**: Secure login and token verification for access control.
- **Health Check**: Endpoint to verify that the service is running.

## Technologies Used

- **Programming Language**: JavaScript (Node.js)
- **Frameworks/Libraries**:
  - Express (API development)
  - Mongoose (MongoDB ODM)
  - bcryptjs (Password hashing)
  - jwt-simple (JWT token generation and validation)
  - dotenv (Environment variable management)
  - body-parser (Handling request bodies)
- **Database**: MongoDB (for user data storage)

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or above)
- MongoDB (locally or via MongoDB Atlas)
- Docker (optional for containerization)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
2. Install dependencies:
```
npm install
```
3. Create a .env file in the root directory with the following environment variables:
```
MONGO_URI=mongodb://<your-mongo-uri>
JWT_SECRET=your_jwt_secret_key
```
4. Run the application:
```
npm start
```
5. If you want to run the tests before starting the application, use:
```
npm test
```
## Usage 

### API Endpoints
```
| Endpoint                     | Method | Description                                      |
|------------------------------|--------|--------------------------------------------------|
| `/api/users`                 | GET    | Get all users                                   |
| `/api/users/verify`          | POST   | Verify user token                               |
| `/api/users/health`          | GET    | Check the health status of the User Service     |
| `/api/users/register`        | POST   | Register a new user                             |
| `/api/users/login`           | POST   | Log in a user and generate a JWT token          |
| `/api/users/:id`             | GET    | Get user details by ID                          |
| `/api/users/:id`             | PUT    | Update user details by ID                       |
| `/api/users/:id`             | DELETE | Delete a user by ID                             |
```
Sample Requests
Register User
Endpoint: /api/users/register
Method: POST
Request Body:
```
{
  "name": "John Doe",
  "email": "john.doe@example.com",
  "password": "password123",
  "role": "farmer"
}
```
Response:
```
{
  "message": "User created",
  "user": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "farmer",
    "_id": "60d8fe48b540820f5c5b6d1c"
  }
}
```
Login User
Endpoint: /api/users/login
Method: POST
Request Body:
```
{
  "email": "john.doe@example.com",
  "password": "password123"
}
```
Response:
```
{
  "token": "jwt_token_here",
  "user": {
    "_id": "60d8fe48b540820f5c5b6d1c",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "role": "farmer"
  }
}
```
Verify Token
Endpoint: /api/users/verify
Method: POST
Request Body:
```
{
  "token": "jwt_token_here"
}
```
Response:
```
{
  "message": "Token is valid",
  "user": {
    "_id": "60d8fe48b540820f5c5b6d1c",
    "role": "farmer"
  }
}
```
Docker Setup
To containerize the service, you can use the following Dockerfile:
# Use the Node.js base image
```
FROM node:18-alpine
```
# Set the working directory
```
WORKDIR /app
```
# Copy package.json and package-lock.json
```
COPY package*.json ./
```
# Install dependencies
```
RUN npm install
```
# Copy the rest of the source code
```
COPY . .
```
# Expose the service port
```
EXPOSE 5001
```
# Run tests
```
RUN npm test
```
# Start the application
```
CMD ["npm", "start"]
```
Build and Run with Docker
Build the Docker image:
```
docker build -t user-management-service .
```
Run the Docker container:
```
docker run -p 5001:5001 -d user-management-service
```
