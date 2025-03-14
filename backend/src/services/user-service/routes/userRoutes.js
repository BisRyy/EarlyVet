const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  verifyToken,
  checkHealth,
  getAllVets,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getAllUsers);
router.post("/verify", verifyToken);
router.get("/health", checkHealth);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/vets", getAllVets);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
