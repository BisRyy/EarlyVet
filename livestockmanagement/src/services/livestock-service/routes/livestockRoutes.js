const express = require("express");
const {
  createLivestock,
  getLivestockByOwner,
  updateLivestock,
  deleteLivestock,
  getAllLivestock,
  checkHealth,
  getLivestock,
} = require("../controllers/livestockController");

const router = express.Router();

// Routes
router.post("/", createLivestock);
router.get("/", getAllLivestock);
router.get("/health", checkHealth);
router.get("/owner/:ownerId", getLivestockByOwner);
router.put("/:id", updateLivestock);
router.get("/:id", getLivestock);
router.delete("/:id", deleteLivestock);

module.exports = router;
