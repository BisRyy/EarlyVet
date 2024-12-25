const express = require("express");
const bodyParser = require("body-parser");
const appointmentRoutes = require("./routes/appointmentRoutes.js");

const app = express();
app.use(bodyParser.json());
app.use("/api/appointments", appointmentRoutes);

module.exports = app;
