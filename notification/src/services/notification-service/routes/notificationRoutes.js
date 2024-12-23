const express = require("express");
const {
  sendEmailNotification,
  sendSMSNotification,
} = require("../controllers/notificationController");

const router = express.Router();

// Routes
router.post("/email", sendEmailNotification);
router.post("/sms", sendSMSNotification);

module.exports = router;
