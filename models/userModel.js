const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Full name split into first and last
    fname: { type: String, required: true },
    lname: { type: String, required: true },

    // Email is the login identifier
    email: { type: String, required: true, unique: true },

    // Optional phone
    phone: { type: String, required: true },

    // Password (hashed)
    password: { type: String, required: true },

    // Role-based access: User, Admin, Seller
    role: {
      type: String,
      enum: ["User", "Admin", "Seller"],
      default: "User",
    },

    // Soft delete / active status
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
