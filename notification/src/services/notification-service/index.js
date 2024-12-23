const express = require("express");
const bodyParser = require("body-parser");
const notificationsRoutes = require("./routes/notificationRoutes.js");

const app = express();
app.use(bodyParser.json());
app.use("/api/notifications", notificationsRoutes);

module.exports = app;
