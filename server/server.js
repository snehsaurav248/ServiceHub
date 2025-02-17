require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");  // Correctly importing the auth routes

const app = express();

// Middleware
app.use(express.json()); // Ensure JSON body parsing
app.use(express.urlencoded({ extended: true })); // Ensure form data parsing
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// Use auth routes
app.use("/auth", authRoutes);  // Ensure the router is used with the "/auth" prefix

// Middleware to Protect Routes
const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "❌ Unauthorized, no token provided" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ Token Verification Error:", err.message);
    return res.status(400).json({ error: "❌ Invalid token" });
  }
};

// Fetch User Profile
app.get("/profile", authenticate, async (req, res) => {
  try {
    console.log("✅ Authenticated User ID:", req.user.id);

    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "❌ User not found" });

    res.json(user);
  } catch (err) {
    console.error("❌ Profile Fetch Error:", err.message);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// Start Server
app.listen(5000, () => console.log("✅ Server running on port 5000"));
