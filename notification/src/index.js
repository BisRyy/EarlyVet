const express = require("express");
const dotenv = require("dotenv");
const amqp = require("amqplib");
const connectDB = require("./config/db");
const notificationService = require("./services/notification-service");
const sendEmail = require("./utils/emailClient");

dotenv.config();
connectDB();

const app = express();
// RabbitMQ Connection
const rabbitMQUrl = "amqp://localhost";
let channel;

async function connectRabbitMQ() {
  const connection = await amqp.connect(rabbitMQUrl);
  channel = await connection.createChannel();
  await channel.assertQueue("notification", { durable: true });
  console.log("Connected to RabbitMQ");

  // Consume prediction requests and simulate processing
  channel.consume("notification", async (msg) => {
    const request = JSON.parse(msg.content.toString());
    console.log("Received notification request:", request);

    await sendEmail(request.to, request.subject, request.message);

    // Acknowledge the request message
    channel.ack(msg);
  });
}

connectRabbitMQ();

// Integrate notification Service
app.use(notificationService);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
