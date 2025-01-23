const express = require("express");
const AuthenticationService = require("./services/authentication");
const User = require("./models/userModel");
const ErrorHandler = require("./middlewares/errorHandler");

const router = express.Router();

/**
 * API route to validate user authentication
 * @route POST /api/auth/validate
 * @body { userId: string }
 * @returns { success: boolean, message: string }
 */
router.post(
  "/auth/validate",
  ErrorHandler.asyncHandler(async (req, res) => {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }

    const isValid = await AuthenticationService.validateUser(userId);

    if (!isValid) {
      return res.status(401).json({ success: false, message: "Invalid user ID" });
    }

    res.json({ success: true, message: "User is valid" });
  })
);

/**
 * API route to fetch active users
 * @route GET /api/users/active
 * @returns { success: boolean, users: array }
 */
router.get(
  "/users/active",
  ErrorHandler.asyncHandler(async (req, res) => {
    const activeUsers = await User.find({ isActive: true });

    res.json({ success: true, users: activeUsers });
  })
);

/**
 * API route to mark a user as inactive
 * @route POST /api/users/inactive
 * @body { socketId: string }
 * @returns { success: boolean, message: string }
 */
router.post(
  "/users/inactive",
  ErrorHandler.asyncHandler(async (req, res) => {
    const { socketId } = req.body;

    if (!socketId) {
      return res.status(400).json({ success: false, message: "Socket ID is required" });
    }

    await User.markInactive(socketId);

    res.json({ success: true, message: "User marked as inactive" });
  })
);

module.exports = router;
