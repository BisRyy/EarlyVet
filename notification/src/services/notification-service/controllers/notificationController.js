const sendEmail = require("../../../utils/emailClient");
const sendSMS = require("../../../utils/smsClient");

// Send Email Notification
const sendEmailNotification = async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendEmail(to, subject, text);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Send SMS Notification
const sendSMSNotification = async (req, res) => {
  try {
    const { to, message } = req.body;

    if (!to || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendSMS(to, message);
    res.status(200).json({ message: "SMS sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { sendEmailNotification, sendSMSNotification };
