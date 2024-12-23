const mongoose = require("mongoose");

const sensorDataSchema = new mongoose.Schema(
  {
    collarId: { type: String, required: true },
    temperature: { type: Number, required: true },
    heartRate: { type: Number, required: true },
    respirationRate: { type: Number, required: true },
    recordedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("SensorData", sensorDataSchema);
