const express = require("express");
const {
  sendEmailNotification,
  sendSMSNotification,
  checkHealth,
} = require("../controllers/notificationController");
const {
  route,
} = require("../../../../../livestockmanagement/src/services/livestock-service");

const router = express.Router();

// Routes
router.post("/email", sendEmailNotification);
router.post("/sms", sendSMSNotification);
router.get("/health", checkHealth);

module.exports = router;
