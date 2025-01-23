const express = require("express");
const {
  getSensorDataByCollarId,
  getLatestSensorData,
  checkHealth,
} = require("../controllers/sensorDataController");

const router = express.Router();

// Fetch the latest sensor data for all collars
router.get("/latest", getLatestSensorData);

router.get("/health", checkHealth);

// Fetch sensor data by collar ID
router.get("/:collarId", getSensorDataByCollarId);

module.exports = router;
