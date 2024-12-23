const express = require("express");
const {
  createLivestock,
  getLivestockByOwner,
  updateLivestock,
  deleteLivestock,
} = require("../controllers/livestockController");

const router = express.Router();

// Routes
router.post("/", createLivestock);
router.get("/owner/:ownerId", getLivestockByOwner);
router.put("/:id", updateLivestock);
router.delete("/:id", deleteLivestock);

module.exports = router;
