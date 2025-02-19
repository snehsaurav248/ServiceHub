const User = require("../models/User");

// ✅ Check if the user is an admin
const isAdmin = (user) => {
  return user && user.role === "admin";
};

// ✅ Get user by ID (excluding password)
const getUserById = async (userId) => {
  try {
    return await User.findById(userId).select("-password");
  } catch (error) {
    console.error("❌ Error fetching user:", error);
    return null;
  }
};

module.exports = { isAdmin, getUserById };
