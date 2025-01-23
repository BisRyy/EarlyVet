const express = require("express");
const {
  sendEmailNotification,
  sendSMSNotification,
  checkHealth,
} = require("../controllers/notificationController");

const router = express.Router();

// Routes
router.post("/email", sendEmailNotification);
router.post("/sms", sendSMSNotification);
router.get("/health", checkHealth);

module.exports = router;
