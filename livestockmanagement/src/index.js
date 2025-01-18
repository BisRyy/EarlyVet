const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const livestockService = require("./services/livestock-service");

dotenv.config();
connectDB();

const app = express();

// Integrate livestock Service
app.use(livestockService);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
