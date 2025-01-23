# Telemedicine Service

This microservice manages telemedicine appointments between farmers, veterinarians, and livestock. It supports creating appointments, retrieving appointments for farmers and vets, and updating appointment statuses. It utilizes MongoDB for storing appointment data and integrates with external services for user validation.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- **Create Appointment**: Allows farmers and vets to create an appointment for livestock treatment.
- **Retrieve Appointments**: Enables farmers and vets to view their upcoming appointments.
- **Update Appointment Status**: Allows the status of an appointment to be updated (e.g., from `pending` to `completed` or `canceled`).
- **User Validation**: Verifies the existence of farmers and vets using an external User Service.
- **MongoDB Integration**: Stores appointment details in MongoDB.

## Technologies Used

- **Programming Language**: JavaScript (Node.js)
- **Frameworks/Libraries**:
  - Express (API development)
  - Mongoose (MongoDB ODM)
  - dotenv (Environment variable management)
  - body-parser (Handling request bodies)
- **Database**: MongoDB (for appointment data storage)
- **External Services**:
  - User Service (to validate farmers and vets)

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
Set up environment variables by creating a .env file in the root directory and defining the following:
```
MONGO_URI=your_mongo_connection_string
PORT=5004
```
Start the application:
```
npm start
```
## Usage
The service runs on the port specified in the .env file (default: 5004).
You can interact with the API using tools like Postman or through your frontend application.
## API Endpoints
POST /api/appointments: Create a new appointment.
Request Body:
```
{
  "farmerId": "string",
  "vetId": "string",
  "livestockId": "string",
  "scheduledAt": "ISO8601 Date",
  "notes": "string"
}
```
- GET /api/appointments/farmer/:farmerId: Get appointments for a farmer.
- GET /api/appointments/vet/:vetId: Get appointments for a vet.
- PUT /api/appointments/:appointmentId/status: Update the status of an appointment.
Request Body:
```
{
  "status": "pending | completed | canceled"
}
```
