# Livestock Management Microservice

This microservice provides CRUD operations to manage livestock records. It supports functionalities such as adding livestock, fetching details by owner or ID, updating records, and deleting records. The service uses MongoDB for data persistence and exposes RESTful APIs.

---

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Docker Setup](#docker-setup)

---

## Features
- **RESTful APIs**: Built with Express.js to manage livestock records.
- **MongoDB Integration**: Stores livestock details securely.
- **Data Validation**: Validates required fields and ensures unique collar IDs.
- **Health Check Endpoint**: Simple health check to verify service uptime.

---

## Technologies Used
- **Backend**: Node.js with Express.js
- **Database**: MongoDB
- **Docker**: Containerization for deployment
- **Libraries**: Mongoose for ODM

---

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB instance
- Docker (optional, for containerized deployment)

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
  `
2. Install dependencies:
  ```bash
npm install
```
3. Set up environment variables in a .env file:
 ```
MONGO_URI=<your-mongodb-uri>
```
4. Start the service:
```
npm start
```
The service will run on http://localhost:5002.

### Usage
Running Locally
Start the Node.js server and ensure MongoDB is running locally or remotely.

Example API Request

Endpoint: /api/livestock/owner/:ownerId
Method: GET
Description: Fetch all livestock records for a specific owner.

Request Example:
```
{
  "ownerId": "user123"
}
```
Response Example:
```
[
  {
    "_id": "64abc123",
    "name": "Daisy",
    "type": "cow",
    "breed": "Holstein",
    "weight": 650,
    "gender": "female",
    "collarId": "COL12345",
    "ownerId": "user123",
    "healthStatus": "healthy"
  }
]
```
### API Endpoints
Endpoint	Method	Description
```
| Endpoint                | Method | Description                              |
|-------------------------|--------|------------------------------------------|
| `/`                     | POST   | Create a new livestock record           |
| `/`                     | GET    | Get all livestock records               |
| `/health`               | GET    | Check the health of the service         |
| `/owner/:ownerId`       | GET    | Fetch livestock records by owner ID     |
| `/:id`                  | GET    | Fetch livestock details by livestock ID |
| `/:id`                  | PUT    | Update livestock details by ID          |
| `/:id`                  | DELETE | Delete a livestock record by ID         |

```
### Docker Setup
Steps to Run with Docker
Build the Docker image:
```
docker build -t livestock-management .
```
Run the container:
```
docker run -p 5002:5002 --env MONGO_URI=<your-mongodb-uri> livestock-management
```
Access the service at http://localhost:5002.
