const express = require("express");
const {
  createAppointment,
  getFarmerAppointments,
  getVetAppointments,
  updateAppointmentStatus,
} = require("../controllers/appointmentController");

const router = express.Router();

// Routes
router.post("/", createAppointment);
router.get("/farmer/:farmerId", getFarmerAppointments);
router.get("/vet/:vetId", getVetAppointments);
router.put("/:appointmentId/status", updateAppointmentStatus);

module.exports = router;
