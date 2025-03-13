const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["farmer", "veterinarian", "admin"],
    default: "farmer",
  },
});

module.exports = mongoose.model("User", userSchema);
