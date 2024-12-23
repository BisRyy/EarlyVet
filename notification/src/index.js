const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const notificationService = require("./services/notification-service");

dotenv.config();
connectDB();

const app = express();

// Integrate notification Service
app.use(notificationService);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
