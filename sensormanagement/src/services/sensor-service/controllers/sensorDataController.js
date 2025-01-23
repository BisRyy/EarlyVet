const SensorData = require("../models/SensorData");

// Fetch sensor data for a specific collar
const getSensorDataByCollarId = async (req, res) => {
  try {
    const { collarId } = req.params;
    const data = await SensorData.find({ collarId }).sort({ recordedAt: -1 });

    if (!data.length) {
      return res
        .status(404)
        .json({ message: "No data found for this collar ID." });
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch the latest data for all collars
const getLatestSensorData = async (req, res) => {
  try {
    const data = await SensorData.aggregate([
      { $sort: { recordedAt: -1 } },
      { $group: { _id: "$collarId", latestData: { $first: "$$ROOT" } } },
    ]);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkHealth = (req, res) => {
  res.status(200).json({ message: "User Service is running" });
};

module.exports = {
  getSensorDataByCollarId,
  getLatestSensorData,
  checkHealth,
};
