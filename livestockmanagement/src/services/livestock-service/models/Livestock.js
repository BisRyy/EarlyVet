const mongoose = require("mongoose");

const livestockSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    type: { type: String, enum: ["cow", "goat", "sheep"], required: true },
    age: { type: Number, required: true },
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
