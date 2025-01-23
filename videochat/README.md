# Video Chat Microservice

This project is a **video chat microservice** built using Node.js, Socket.IO, and MongoDB. The microservice enables real-time video communication between users, facilitating secure authentication and seamless signaling for WebRTC connections.

---

## Features

- **Real-Time Communication**: Utilizes WebSockets to establish a real-time connection between users.
- **Authentication**: Supports JWT-based user authentication.
- **Socket.IO Signaling**: Handles signaling for WebRTC connections.
- **MongoDB Integration**: Stores user data and tracks connections.
- **REST API**: Provides endpoints for managing users and connections.
- **Modular Design**: Built with a clear separation of concerns for scalability and maintainability.

---

## Prerequisites

Before running this project, ensure you have the following installed:

- **Node.js** (>= 16.x)
- **npm** (>= 8.x)
- **MongoDB** (running locally or via a cloud provider like MongoDB Atlas)

---

## Installation

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd video-chat-microservice
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Environment Setup**:
   Create a `.env` file in the root directory and define the following variables:

   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/video-chat
   JWT_SECRET=your_secret_key
   SOCKET_PORT=5000
   ```

4. **Start the Server**:
   - For production:
     ```bash
     npm start
     ```
   - For development:
     ```bash
     npm run dev
     ```

---

## Project Structure

The project follows a modular structure for ease of maintenance and scalability:

```plaintext
video-chat-microservice/
├── models/
│   └── userModel.js        # Mongoose schema for user data
├── routes/
│   └── apiRoutes.js        # REST API routes for user and connection management
├── services/
│   ├── socketService.js    # Handles WebSocket logic and signaling
│   └── authentication.js   # Manages JWT authentication
├── utils/
│   ├── errorHandler.js     # Centralized error handling middleware
│   └── config.js           # Environment variable configuration
├── tests/
│   └── socketTests.js      # WebSocket functionality tests
├── app.js                  # Main server entry point
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation
```

---

## API Endpoints

### Authentication

- **Login**:

  - `POST /api/auth/login`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

- **Register**:
  - `POST /api/auth/register`
  - Request Body:
    ```json
    {
      "email": "user@example.com",
      "password": "password123"
    }
    ```

### WebSocket Communication

- **Connect Users**:

  - Event: `connectUsers`
  - Payload:
    ```json
    {
      "user1": "userId1",
      "user2": "userId2"
    }
    ```

- **Start Signaling**:
  - Event: `startSignaling`
  - Sent by the server to initiate WebRTC signaling between users.

---

## Testing

1. **Run WebSocket Tests**:

   ```bash
   npm test
   ```

2. **Expected Output**:
   - Successful connection and event handling between clients and the server.

---

## Error Handling

- Centralized error handling is implemented using `errorHandler.js`.
- Errors are logged and sent to the client in a structured format:
  ```json
  {
    "success": false,
    "error": "Error message here"
  }
  ```

---

## Future Enhancements

- Add support for **group video chats**.
- Implement **rate limiting** to enhance security.
- Integrate with **TURN servers** for better WebRTC connectivity.
- Enhance the UI for real-time monitoring of active connections.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contributors

- **Amanuel Ayana** - Developer

Feel free to contribute to this project by submitting issues or pull requests!
