// send_random_data.js
const amqp = require("amqplib");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define a Mongoose schema and model for livestock
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

const Livestock = mongoose.model("Livestock", livestockSchema);

async function sendRandomData() {
  const queue = "sensor_data";
  const rabbitMQUrl = "amqp://localhost";

  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(queue, { durable: true });

    console.log(`Sending random data to queue: ${queue}`);

    // Generate and send random data for two sensors
    setInterval(() => {
      // Send the latest data for all devices on connection
      Livestock.find()
        .then((allData) => {
          allData.forEach((data) => {
            console.log("Sending data for device:", data.collarId);
            const sensor1Data = {
              deviceId: data.collarId,
              temperature: parseFloat((20 + Math.random() * 10).toFixed(2)),
              heartRate: Math.floor(60 + Math.random() * 40),
              activity: Math.floor(Math.random() * 100),
              bloodPressure: Math.floor(80 + Math.random() * 40),
              location: `${(Math.random() * 180 - 90).toFixed(6)},${(
                Math.random() * 360 -
                180
              ).toFixed(6)}`,
              timestamp: new Date().toISOString(),
            };

            //  Send the data to the queue
            channel.sendToQueue(
              queue,
              Buffer.from(JSON.stringify(sensor1Data))
            );
          });
        })
        .catch((err) => console.error("Error fetching initial data:", err));
    }, 3000); // Send data every 2 seconds
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

sendRandomData();
