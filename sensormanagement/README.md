# Sensor Management Service

This microservice manages the sensor data for livestock collars. It provides functionality to fetch sensor data by collar ID, retrieve the latest sensor data for all collars, and receive real-time sensor data via MQTT. The service stores the sensor data in MongoDB and supports integration with other systems through API endpoints.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Health Check](#health-check)

## Features

- **Fetch Sensor Data by Collar ID**: Retrieve sensor data for a specific collar, including temperature, heart rate, and respiration rate.
- **Latest Sensor Data**: Get the latest sensor data for each collar.
- **Real-time Data Processing**: Sensor data is received via MQTT and stored in MongoDB.
- **MongoDB Integration**: Stores sensor data in MongoDB for persistence and easy querying.
- **API Integration**: Exposes API endpoints for retrieving sensor data.
- **Health Check**: An endpoint to check the status of the service.

## Technologies Used

- **Programming Language**: JavaScript (Node.js)
- **Frameworks/Libraries**:
  - Express (API development)
  - Mongoose (MongoDB ODM)
  - MQTT (Real-time message processing)
  - dotenv (Environment variable management)
  - body-parser (Handling request bodies)
- **Database**: MongoDB (for sensor data storage)
- **Message Broker**: MQTT (for real-time data processing)

## Installation

### Prerequisites

Ensure you have the following installed:
- Node.js (v18 or above)
- MongoDB (locally or via MongoDB Atlas)
- MQTT Broker (e.g., Mosquitto)

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
MQTT_BROKER_URL=mqtt://localhost:1883
PORT=5004
```
Start the application:
```
npm start
```
## Usage
The service runs on the port specified in the .env file (default: 5004).
It listens for incoming MQTT messages on the sensor/data topic and processes them into MongoDB.
You can interact with the API using tools like Postman or through your frontend application.
## API Endpoints
- GET /api/sensor/latest: Retrieve the latest sensor data for all collars.
- GET /api/sensor/:collarId: Fetch sensor data for a specific collar by its collar ID.
## Health Check
To verify that the service is running properly, visit the /health endpoint. The response will be a simple JSON message indicating the status of the service:
```
{
  "status": "Service is running"
}
```
