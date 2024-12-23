const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const sensorService = require("./services/sensor-service");

dotenv.config();
connectDB();

const app = express();

// Integrate sensor Service
app.use(sensorService);

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
