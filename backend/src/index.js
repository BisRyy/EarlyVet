const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const connectDB = require("./config/db");
const userService = require("./services/user-service");
const authService = require("./services/auth-service");
const sensorService = require("./services/sensor-service");
const livestockService = require("./services/livestock-service");
const swaggerSpec = require("./config/swagger");
dotenv.config();
connectDB();

const app = express();

// Serve Swagger documentation
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

// Enable CORS
app.use(cors());

// Integrate User Service
app.use(userService);
app.use(authService);
app.use(sensorService);
app.use(livestockService);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
