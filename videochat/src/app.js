const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");
const socketService = require("./services/socketService");
const ErrorHandler = require("./middlewares/errorHandler");
const { SOCKET_PORT, MONGO_URI } = require("./config/config");

const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err.message));

// Attach API routes
app.use("/api", apiRoutes);

// Middleware to handle 404 errors
app.use(ErrorHandler.notFoundHandler);

// Middleware for centralized error handling
app.use(ErrorHandler.globalErrorHandler);

// Start the HTTP server
const server = http.createServer(app);

// Attach Socket.IO to the server
const io = socketIo(server, {
  cors: {
    origin: "*", // Adjust this as needed for security
    methods: ["GET", "POST"],
  },
});

// Initialize socket service
socketService.initialize(io);

// Start the server
server.listen(SOCKET_PORT, () => {
  console.log(`Server is running on port ${SOCKET_PORT}`);
});
