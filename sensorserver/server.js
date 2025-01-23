// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const amqp = require("amqplib");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Initialize Express app and HTTP server
const app = express(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

dotenv.config();

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Mongoose schema and model for sensor data
const sensorSchema = new mongoose.Schema(
  {
    deviceId: { type: String },
    temperature: { type: Number },
    heartRate: { type: Number },
    activity: { type: Number },
    bloodPressure: { type: Number },
    location: { type: String },
    timestamp: { type: String },
  },
  { timestamps: true }
);

// Remove unique index to store all recordings
// sensorSchema.index({ deviceId: 1 }, { unique: true });

const SensorData = mongoose.model("SensorData", sensorSchema);

// RabbitMQ setup
const queue = "sensor_data";
const rabbitMQUrl = "amqp://localhost";

async function receiveSensorData() {
  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(queue, { durable: true });

    console.log(`Waiting for messages in queue: ${queue}`);

    // Consume messages from RabbitMQ
    channel.consume(
      queue,
      async (msg) => {
        const sensorData = JSON.parse(msg.content.toString());
        console.log("Received from RabbitMQ:", sensorData);

        // Save all sensor recordings
        await SensorData.create(sensorData);
        console.log("Saved to MongoDB:", sensorData);

        // Emit the latest data to WebSocket clients
        io.emit("sensorData", sensorData);

        // Acknowledge the message
        channel.ack(msg);
      },
      { noAck: false }
    );
  } catch (error) {
    console.error("Error receiving sensor data:", error);
  }
}

// Start RabbitMQ consumer
receiveSensorData();

// WebSocket connection handling
io.on("connection", (socket) => {
  console.log("A client connected:", socket.id);

  // Send the latest data for all devices on connection
  SensorData.aggregate([
    {
      $sort: { createdAt: -1 },
    },
    {
      $group: {
        _id: "$deviceId",
        latest: { $first: "$$ROOT" },
      },
    },
    {
      $replaceRoot: { newRoot: "$latest" },
    },
  ])
    .then((latestData) => {
      latestData.forEach((data) => {
        socket.emit("sensorData", data);
      });
    })
    .catch((err) => console.error("Error fetching initial data:", err));

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Add route to get the latest sensor data by device ID
app.get("/:id", async (req, res) => {
  try {
    const deviceId = req.params.id;
    const sensorData = await SensorData.findOne({ deviceId })
      .sort({ createdAt: -1 })
      .exec();

    if (sensorData) {
      res.json(sensorData);
    } else {
      res.status(404).json({ message: "Sensor data not found" });
    }
  } catch (error) {
    console.error("Error fetching sensor data:", error);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/health", async (req, res) => {
  res.json({ status: "UP" });
});

// Start the server
const PORT = 5004;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
