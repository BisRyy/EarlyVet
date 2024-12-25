const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    farmerId: { type: String, required: true }, // User IDs will be retrieved via User Service
    vetId: { type: String, required: true }, // User IDs will be retrieved via User Service
    livestockId: { type: String, required: true }, // Livestock details from an external service
    scheduledAt: { type: Date, required: true },
    status: {
      type: String,
      enum: ["pending", "completed", "canceled"],
      default: "pending",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
