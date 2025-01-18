const express = require("express");
const bodyParser = require("body-parser");
const livestockRoutes = require("./routes/livestockRoutes");
const cors = require("cors")

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use("/api/livestock", livestockRoutes);

module.exports = app;
