const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userService = require("./services/user-service");
const authService = require("./services/auth-service");
const sensorService = require("./services/sensor-service");
const livestockService = require("./services/livestock-service");

dotenv.config();
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Integrate User Service
app.use(userService);
app.use(authService);
app.use(sensorService);
app.use(livestockService);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
