// user_service.js
const express = require("express");
const amqp = require("amqplib");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors"); // Import CORS middleware

const app = express();
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

dotenv.config();

// MongoDB connection setup
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Prediction Schema
const predictionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    livestockId: { type: String, required: true },
    status: { type: String, default: "pending" },
    disease: { type: String, default: "Unknown" },
    probability: { type: Number, default: 0 },
    symptoms: { type: [String], default: [] },
    recommendedActions: { type: [String], default: [] },
    timestamp: { type: String, default: () => new Date().toISOString() },
  },
  { timestamps: true }
);

const Prediction = mongoose.model("Prediction", predictionSchema);

// RabbitMQ Connection
const rabbitMQUrl = "amqp://rabbitmq";
let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect(rabbitMQUrl);
  channel = await connection.createChannel();
  await channel.assertQueue("prediction_requests", { durable: true });
  await channel.assertQueue("prediction_responses", { durable: true });
  console.log("Connected to RabbitMQ");

  // Consume prediction requests and simulate processing
  channel.consume("prediction_requests", async (msg) => {
    const request = JSON.parse(msg.content.toString());
    console.log("Received prediction request:", request);

    // Simulate prediction processing
    const mockResponse = {
      id: request.id,
      livestockId: request.livestockId,
      status: "completed",
      disease: "Sample Disease",
      probability: 0.8,
      symptoms: [
        "Slightly elevated body temperature",
        "Reduced milk production",
        "Minor changes in milk composition",
        "Subtle changes in feeding behavior",
      ],
      recommendedActions: [
        "Schedule immediate veterinary examination",
        "Isolate from healthy cattle",
        "Begin monitoring milk quality daily",
        "Prepare for potential antibiotic treatment",
      ],
      timestamp: new Date().toISOString(),
    };

    // Simulate a delay of 1 minute
    await new Promise((resolve) => setTimeout(resolve, 60000));

    // Publish the mock response to the response queue
    channel.sendToQueue(
      "prediction_responses",
      Buffer.from(JSON.stringify(mockResponse))
    );
    console.log("Mock prediction response sent:", mockResponse);

    // Acknowledge the request message
    channel.ack(msg);
  });

  // Consume prediction responses and update the database
  channel.consume("prediction_responses", async (msg) => {
    const response = JSON.parse(msg.content.toString());
    console.log("Received prediction response:", response);

    try {
      await Prediction.findOneAndUpdate({ id: response.id }, response, {
        new: true,
      });
      console.log("Prediction result updated in MongoDB:", response);
    } catch (err) {
      console.error("Error updating prediction in MongoDB:", err);
    }

    // Acknowledge the response message
    channel.ack(msg);
  });
}

connectRabbitMQ();

// API to request a prediction
app.get("/predict/:livestockId", async (req, res) => {
  const { livestockId } = req.params;
  const id = `prediction-${Date.now()}`;

  // Create a new prediction entry in MongoDB
  const newPrediction = new Prediction({
    id,
    livestockId,
  });

  try {
    await newPrediction.save();
    console.log("New prediction request saved to MongoDB:", newPrediction);

    // Publish the prediction request to RabbitMQ
    const request = { id, livestockId };
    channel.sendToQueue(
      "prediction_requests",
      Buffer.from(JSON.stringify(request))
    );
    console.log("Prediction request sent:", request);

    res.status(202).send(newPrediction);
  } catch (err) {
    console.error("Error saving prediction request to MongoDB:", err);
    res.status(500).send({ error: "Failed to create prediction request" });
  }
});

// API to get predictions for a user
app.get("/predictions/:livestockId", async (req, res) => {
  const { livestockId } = req.params;

  try {
    const prediction = await Prediction.findOne({ livestockId }, null, {
      sort: { createdAt: -1 },
    });

    if (!prediction) {
      return res.status(201);
    }
    res.status(200).send(prediction);
  } catch (err) {
    console.error("Error fetching prediction from MongoDB:", err);
    res.status(500).send({ error: "Failed to fetch prediction" });
  }
});

app.get("/health", async (req, res) => {
  res.json({ status: "UP" });
});

// Start the server
const PORT = 5003;
app.listen(PORT, () => {
  console.log(`Service running on http://localhost:${PORT}`);
});
