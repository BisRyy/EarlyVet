const mongoose = require("mongoose");

// Defined the User schema
const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
    },
    socketId: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    lastSeen: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Static method to find or create a user
UserSchema.statics.findOrCreate = async function (userId, socketId) {
  let user = await this.findOne({ userId });
  if (!user) {
    user = await this.create({ userId, socketId });
  } else {
    user.socketId = socketId;
    user.isActive = true;
    user.lastSeen = null;
    await user.save();
  }
  return user;
};

// Static method to mark a user as inactive on disconnect
UserSchema.statics.markInactive = async function (socketId) {
  const user = await this.findOne({ socketId });
  if (user) {
    user.isActive = false;
    user.lastSeen = new Date();
    await user.save();
  }
};

module.exports = mongoose.model("User", UserSchema);
