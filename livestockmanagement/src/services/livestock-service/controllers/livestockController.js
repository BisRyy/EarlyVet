const Livestock = require("../models/Livestock");

// Create a new livestock record
const createLivestock = async (req, res) => {
  try {
    const { name, type, age, healthStatus, collarId, ownerId } = req.body;

    const livestock = new Livestock({
      name,
      type,
      age,
      healthStatus,
      collarId,
      ownerId,
    });
    await livestock.save();

    res.status(201).json({ message: "Livestock created", livestock });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all livestock records for an owner
const getLivestockByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const livestock = await Livestock.find({ ownerId });
    res.status(200).json(livestock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update livestock details
const updateLivestock = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedLivestock = await Livestock.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedLivestock)
      return res.status(404).json({ message: "Livestock not found" });

    res.status(200).json(updatedLivestock);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a livestock record
const deleteLivestock = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLivestock = await Livestock.findByIdAndDelete(id);
    if (!deletedLivestock)
      return res.status(404).json({ message: "Livestock not found" });

    res.status(200).json({ message: "Livestock deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createLivestock,
  getLivestockByOwner,
  updateLivestock,
  deleteLivestock,
};
