const express = require("express");
const {
  getSensorDataByCollarId,
  getLatestSensorData,
} = require("../controllers/sensorDataController");

const router = express.Router();

// Fetch the latest sensor data for all collars
router.get("/latest", getLatestSensorData);

// Fetch sensor data by collar ID
router.get("/:collarId", getSensorDataByCollarId);

module.exports = router;
