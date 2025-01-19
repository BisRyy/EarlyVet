// socket_client_sensor_001.js
const io = require("socket.io-client");

// Connect to the WebSocket server
const socket = io("http://localhost:3001");

// Listen for sensor data
socket.on("sensorData", (data) => {
  if (data.deviceId === "sensor-001") {
    console.log("Received data for sensor-001:", data);
  }
});

socket.on("connect", () => {
  console.log("Connected to the WebSocket server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from the WebSocket server");
});
