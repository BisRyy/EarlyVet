const Appointment = require("../models/Appointment");
const { getUserById } = require("../../../../utils/apiClient");

// Create a new appointment
const createAppointment = async (req, res) => {
  try {
    const { farmerId, vetId, livestockId, scheduledAt, notes } = req.body;

    // Validate input
    if (!farmerId || !vetId || !livestockId || !scheduledAt) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Verify farmer and vet exist via User Service
    const farmer = await getUserById(farmerId);
    const vet = await getUserById(vetId);

    if (!farmer || !vet) {
      return res.status(404).json({ error: "Farmer or Vet not found" });
    }

    const appointment = new Appointment({
      farmerId,
      vetId,
      livestockId,
      scheduledAt,
      notes,
    });
    await appointment.save();

    res
      .status(201)
      .json({ message: "Appointment created successfully", appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments for a farmer
const getFarmerAppointments = async (req, res) => {
  try {
    const { farmerId } = req.params;
    const appointments = await Appointment.find({ farmerId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get appointments for a vet
const getVetAppointments = async (req, res) => {
  try {
    const { vetId } = req.params;
    const appointments = await Appointment.find({ vetId });
    res.status(200).json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const { status } = req.body;

    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    );

    if (!appointment)
      return res.status(404).json({ error: "Appointment not found" });

    res
      .status(200)
      .json({ message: "Appointment status updated", appointment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAppointment,
  getFarmerAppointments,
  getVetAppointments,
  updateAppointmentStatus,
};
