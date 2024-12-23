const express = require("express");
const bodyParser = require("body-parser");
const livestockRoutes = require("./routes/livestockRoutes");

const app = express();
app.use(bodyParser.json());
app.use("/api/livestock", livestockRoutes);

module.exports = app;
