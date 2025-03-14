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
} = require("../controllers/userController");

const router = express.Router();

/**
 * @swagger
 * /api/resource:
 * get:
 * summary: Get a resource
 * description: Get a specific resource by ID.
 * parameters:
 * — in: path
 * name: id
 * required: true
 * description: ID of the resource to retrieve.
 * schema:
 * type: string
 * responses:
 * 200:
 * description: Successful response
 */
router.get("/", getAllUsers);

router.post("/verify", verifyToken);
router.get("/health", checkHealth);
router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
