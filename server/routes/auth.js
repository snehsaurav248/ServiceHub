const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const rateLimit = require("express-rate-limit");

const router = express.Router();

// Utility function for error handling
const handleError = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({ error: `❌ ${message}` });
};

// Rate limiter to prevent brute-force attacks
const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: "❌ Too many signup attempts. Please try again later.",
});

const signinLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "❌ Too many signin attempts. Please try again later.",
});

// ✅ Signup Route
router.post(
  "/signup",
  signupLimiter,
  [
    body("name").notEmpty().withMessage("❌ Name is required"),
    body("email").isEmail().withMessage("❌ Invalid email"),
    body("password").isLength({ min: 6 }).withMessage("❌ Password must be at least 6 characters"),
    body("phone").isMobilePhone().withMessage("❌ Invalid phone number"),
    body("address").notEmpty().withMessage("❌ Address is required"),
    body("role").notEmpty().withMessage("❌ Role is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleError(res, errors.array()[0].msg);

    const { name, email, password, phone, address, role } = req.body;

    console.log("Received password during signup:", password); // Log received password

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return handleError(res, "Email already in use");

      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed password:", hashedPassword); // Log the hashed password

      const newUser = new User({ name, email, password: hashedPassword, phone, address, role });
      await newUser.save();

      res.status(201).json({ message: "✅ Signup successful. Please login!" });
    } catch (err) {
      console.error("❌ Server Error:", err);
      return handleError(res, "Server error", 500);
    }
  }
);


// ✅ Signin Route
router.post(
  "/signin",
  signinLimiter,
  [
    body("email").isEmail().withMessage("❌ Invalid email"),
    body("password").notEmpty().withMessage("❌ Password is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return handleError(res, errors.array()[0].msg);

    const { email, password } = req.body;

    console.log("Received password:", password); // Log received password

    try {
      const user = await User.findOne({ email });
      if (!user) return handleError(res, "User not found", 404);

      // ✅ Ensure password comparison works correctly
      const isMatch = await bcrypt.compare(password.trim(), user.password);
      console.log("Stored hashed password:", user.password); // Log stored hashed password
      console.log("Password match result:", isMatch); // Log password comparison result

      if (!isMatch) return handleError(res, "Invalid credentials", 401);

      // ✅ Ensure token generation works
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

      res.json({
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      });
    } catch (err) {
      console.error("❌ Server Error:", err);
      return handleError(res, "Server error", 500);
    }
  }
);
// ✅ Profile Route
router.get("/profile", async (req, res) => {
  try {
    // Assuming the user is authenticated using JWT
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header
    if (!token) return handleError(res, "❌ No token provided", 401);

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Decode token to get user ID
    const user = await User.findById(decoded.id); // Find user by decoded ID

    if (!user) return handleError(res, "❌ User not found", 404);

    // Send user profile data (excluding sensitive information like password)
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
    });
  } catch (err) {
    console.error("❌ Server Error:", err);
    return handleError(res, "❌ Server error", 500);
  }
});


module.exports = router;
