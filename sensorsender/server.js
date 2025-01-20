// send_random_data.js
const amqp = require("amqplib");

async function sendRandomData() {
  const queue = "sensor_data";
  const rabbitMQUrl = "amqp://rabbitmq";

  try {
    // Connect to RabbitMQ
    const connection = await amqp.connect(rabbitMQUrl);
    const channel = await connection.createChannel();

    // Ensure the queue exists
    await channel.assertQueue(queue, { durable: true });

    console.log(`Sending random data to queue: ${queue}`);

    // Generate and send random data for two sensors
    setInterval(() => {
      const sensor1Data = {
        deviceId: "sensor-001",
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

      const sensor2Data = {
        deviceId: "678812a00120f37876b3c98a",
        temperature: parseFloat((18 + Math.random() * 8).toFixed(2)),
        heartRate: Math.floor(60 + Math.random() * 40),
        activity: Math.floor(Math.random() * 100),
        bloodPressure: Math.floor(80 + Math.random() * 40),
        location: `${(Math.random() * 180 - 90).toFixed(6)},${(
          Math.random() * 360 -
          180
        ).toFixed(6)}`,
        timestamp: new Date().toISOString(),
      };

      // Send data to RabbitMQ
      channel.sendToQueue(queue, Buffer.from(JSON.stringify(sensor1Data)));
      console.log("Sent:", sensor1Data);

      channel.sendToQueue(queue, Buffer.from(JSON.stringify(sensor2Data)));
      console.log("Sent:", sensor2Data);
    }, 2000); // Send data every 2 seconds
  } catch (error) {
    console.error("Error sending data:", error);
  }
}

sendRandomData();
