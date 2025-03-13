const mongoose = require("mongoose");

const livestockSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["cow", "goat", "sheep"], required: true },
    breed: String,
    weight: Number,
    dateOfBirth: String,
    gender: { type: String, enum: ["male", "female"], default: "male" },
    healthStatus: { type: String, default: "healthy" },
    collarId: { type: String, required: true, unique: true },
    ownerId: {
      type: String,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Livestock", livestockSchema);
