# Notification Service

This microservice handles the sending of email and SMS notifications. It provides endpoints to send both types of notifications based on user requests.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Features

- **Email Notifications**: Sends email notifications using the Resend service.
- **SMS Notifications**: Sends SMS notifications using Twilio.
- **REST API**: A REST API for sending notifications.
- **Input Validation**: Ensures all required fields are provided before sending a notification.
- **Error Handling**: Catches errors and returns appropriate error messages.

## Technologies Used

- **Programming Language**: JavaScript (Node.js)
- **Frameworks/Libraries**:
  - Express (API development)
  - Resend (Email sending)
  - Twilio (SMS sending)
  - Body-parser (Handling request bodies)
  - dotenv (Environment variables)

## Installation

### Prerequisites

Ensure you have Node.js installed and environment variables set up for Twilio and Resend services.

### Steps

1. Clone this repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
2. Install dependencies:
```
npm install
```
Run the service:
```
npm start
```
The API will be available at http://localhost:5005.

### Usage
Running Locally Start the Express server using:
```
npm start
```
Example Requests

Send Email Notification

Endpoint: /api/notifications/email
Method: POST
Request Body:
```
{
  "to": "recipient@example.com",
  "subject": "Test Email",
  "text": "This is a test email."
}
```
Response:
```
{
  "message": "Email sent successfully"
}
```
Send SMS Notification

Endpoint: /api/notifications/sms
Method: POST
Request Body:
```
{
  "to": "+1234567890",
  "message": "This is a test SMS."
}
```
Response:
```
{
  "message": "SMS sent successfully"
}
```
## API Endpoints

| Endpoint                     | Method | Description                        |
|------------------------------|--------|------------------------------------|
| `/api/notifications/email`    | POST   | Send an email notification          |
| `/api/notifications/sms`      | POST   | Send an SMS notification            |

### Docker 

1. Use the Node.js base image
FROM node:18-alpine

2. Set the working directory
WORKDIR /app

3. Copy package.json and package-lock.json
COPY package*.json ./

4. Install dependencies
RUN npm install

5. Copy the rest of the source code
COPY . .

6. Expose the service port
EXPOSE 5005

7. Start the application
CMD ["npm", "start"]

