// Configuration file for the microservice

module.exports = {
    SOCKET_PORT: 3000, // Port for socket communication
    WEBRTC_CONFIG: {
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" }, // Free STUN server from Google
        { urls: "stun:stun1.l.google.com:19302" },
      ],
    },
    AUTH_SERVICE_URL: "http://localhost:4000/auth", // URL for the authentication microservice
    ENV: process.env.NODE_ENV || "development", // Environment setting
  };
  