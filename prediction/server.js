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
const rabbitMQUrl = "amqp://localhost";
let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect(rabbitMQUrl);
  channel = await connection.createChannel();
  await channel.assertQueue("prediction_requests", { durable: true });
  await channel.assertQueue("prediction_responses", { durable: true });
  await channel.assertQueue("notification", { durable: true });

  console.log("Connected to RabbitMQ");

  // Consume prediction requests and simulate processing
  channel.consume("prediction_requests", async (msg) => {
    const request = JSON.parse(msg.content.toString());
    console.log("Received prediction request:", request);

    // Simulate prediction processing
    const diseases = [
      "Subclinical Mastitis",
      "Lameness",
      "Respiratory Infection",
      "Foot Rot",
      "Bloat",
    ];
    const randomDisease = diseases[Math.floor(Math.random() * diseases.length)];

    const mockResponse = {
      id: request.id,
      livestockId: request.livestockId,
      status: "completed",
      disease: randomDisease,
      probability: Math.random(),
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
    await new Promise((resolve) => setTimeout(resolve, 6000));

    // Publish the mock response to the response queue
    channel.sendToQueue(
      "prediction_responses",
      Buffer.from(JSON.stringify(mockResponse))
    );
    console.log("Mock prediction response sent:", mockResponse);

    channel.sendToQueue(
      "notification",
      Buffer.from(
        JSON.stringify({
          to: request.email || "kiyyakebere@gmail.com",
          subject: "EarlyVet Notification",
          message: `<!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prediction Ready</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .email-container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border: 1px solid #dddddd;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #4CAF50;
      color: #ffffff;
      padding: 15px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 20px;
    }
    .content {
      padding: 20px;
      color: #333333;
    }
    .content h2 {
      margin-top: 0;
    }
    .content p {
      line-height: 1.6;
    }
    .button {
      display: inline-block;
      background-color: #4CAF50;
      color: #ffffff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
      margin-top: 20px;
      font-size: 16px;
    }
    .footer {
      background-color: #f1f1f1;
      color: #888888;
      text-align: center;
      padding: 10px;
      font-size: 12px;
    }
    </style>
  </head>
  <body>
    <div class="email-container">
    <img src="https://earlyvet.bisry.me/logo.jpeg" alt="EarlyVet Logo" style="width: 100%; height: auto;">
    <div class="header">
      <h1>EarlyVet - Prediction Ready</h1>
    </div>
    <div class="content">
      <h2>Hello,</h2>
      <p>We have completed the disease prediction for your livestock <strong>Livestock ID: ${
        mockResponse.livestockId
      }</strong>.</p>
      <p><strong>Prediction Summary:</strong></p>
      <ul>
      <li><strong>Disease:</strong> ${mockResponse.disease}</li>
      <li><strong>Probability:</strong> ${(
        mockResponse.probability * 100
      ).toFixed(2)}%</li>
      <li><strong>Symptoms:</strong></li>
      <ul>
        ${mockResponse.symptoms
          .map((symptom) => `<li>${symptom}</li>`)
          .join("")}
      </ul>
      <li><strong>Recommended Actions:</strong></li>
      <ul>
        ${mockResponse.recommendedActions
          .map((action) => `<li>${action}</li>`)
          .join("")}
      </ul>
      </ul>
      <p>We recommend reviewing the full report and taking the necessary actions promptly.</p>
      <a href="http://earlyvet.com/dashboard/livestock/${
        mockResponse.livestockId
      }" class="button">View Full Report</a>
    </div>
    <div class="footer">
      <p>&copy; 2025 EarlyVet. All rights reserved.</p>
    </div>
    </div>
  </body>
  </html>
  `,
        })
      )
    );
    console.log("Notification sent:");

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
  const { email } = req.query;
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
    const request = { id, livestockId, email };
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
