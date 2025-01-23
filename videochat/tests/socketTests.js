const io = require("socket.io-client");

// this URL will be replaced with the server's URL
const SOCKET_URL = "http://localhost:5000";

// Test users and mock data
const mockUsers = [
  { userId: "testUser1", socketId: null },
  { userId: "testUser2", socketId: null },
];

const testEvents = async () => {
  console.log("Starting WebSocket tests...");

  // Connect two clients to the server
  const client1 = io(SOCKET_URL, { transports: ["websocket"], reconnection: true });
  const client2 = io(SOCKET_URL, { transports: ["websocket"], reconnection: true });

  // Event listeners for client1
  client1.on("connect", () => {
    console.log(`Client 1 connected with socket ID: ${client1.id}`);
    mockUsers[0].socketId = client1.id;

    // Emit event to establish connection
    client1.emit("connectUsers", { user1: mockUsers[0].userId, user2: mockUsers[1].userId });
    console.log(`Client 1 emitted connectUsers event: ${mockUsers[0].userId}, ${mockUsers[1].userId}`);
  });

  client1.on("startSignaling", (data) => {
    console.log("Client 1 received startSignaling event:", data);
  });

  client1.on("connect_error", (error) => {
    console.error("Client 1 connection error:", error.message);
  });

  client1.on("disconnect", () => {
    console.log("Client 1 disconnected.");
  });

  // Event listeners for client2
  client2.on("connect", () => {
    console.log(`Client 2 connected with socket ID: ${client2.id}`);
    mockUsers[1].socketId = client2.id;

    // Simulating client acknowledgment
    console.log("Client 2 is ready for signaling.");
  });

  client2.on("startSignaling", (data) => {
    console.log("Client 2 received startSignaling event:", data);
  });

  client2.on("connect_error", (error) => {
    console.error("Client 2 connection error:", error.message);
  });

  client2.on("disconnect", () => {
    console.log("Client 2 disconnected.");
  });

  // Disconnect clients after 10 seconds
  setTimeout(() => {
    console.log("Disconnecting clients...");
    client1.disconnect();
    client2.disconnect();
  }, 10000);
};

// Execute the test
testEvents();
