const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const telemedicineService = require("./services/telemedicine-service");

dotenv.config();
connectDB();

const app = express();

// Integrate User Service
app.use(telemedicineService);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
