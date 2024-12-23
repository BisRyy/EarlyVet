const mqtt = require("mqtt");
const SensorData = require("../models/SensorData");

const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL || "mqtt://localhost:1883";

const mqttClient = mqtt.connect(MQTT_BROKER_URL);

mqttClient.on("connect", () => {
  console.log("Connected to MQTT broker...");
  mqttClient.subscribe("sensor/data", (err) => {
    if (!err) console.log("Subscribed to sensor/data topic.");
  });
});

mqttClient.on("message", async (topic, message) => {
  if (topic === "sensor/data") {
    try {
      const data = JSON.parse(message.toString());

      const { collarId, temperature, heartRate, respirationRate } = data;

      // Save data to MongoDB
      const sensorData = new SensorData({
        collarId,
        temperature,
        heartRate,
        respirationRate,
      });
      await sensorData.save();

      console.log("Sensor data saved:", data);
    } catch (err) {
      console.error("Failed to process sensor data:", err.message);
    }
  }
});

module.exports = mqttClient;
