const { Server } = require("socket.io");
const { WEBRTC_CONFIG } = require("../config/config");

class SocketService {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: "*", // Replace with allowed origins in production
        methods: ["GET", "POST"],
      },
    });
    this.clients = {}; // Object to track connected clients
    this.initialize();
  }

  initialize() {
    this.io.on("connection", (socket) => {
      console.log(`Client connected: ${socket.id}`);

      // Handle incoming IDs from other microservices
      socket.on("connectUsers", ({ user1, user2 }) => {
        console.log(`Attempting to connect users: ${user1} and ${user2}`);
        this.clients[user1] = socket;
        this.clients[user2] = socket;

        // Notify both users to start WebRTC signaling
        this.io.to(socket.id).emit("startSignaling", { user1, user2 });
      });

      // Handle WebRTC signaling messages
      socket.on("signal", ({ to, data }) => {
        if (this.clients[to]) {
          this.clients[to].emit("signal", { from: socket.id, data });
        } else {
          console.error(`Client with ID ${to} not found.`);
        }
      });

      // Handle disconnections
      socket.on("disconnect", () => {
        console.log(`Client disconnected: ${socket.id}`);
        this.removeClient(socket.id);
      });
    });
  }

  removeClient(socketId) {
    for (const [userId, clientSocket] of Object.entries(this.clients)) {
      if (clientSocket.id === socketId) {
        delete this.clients[userId];
        break;
      }
    }
  }
}

module.exports = SocketService;
