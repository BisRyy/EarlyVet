const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userService = require("./services/user-service");

dotenv.config();
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Integrate User Service
app.use(userService);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
