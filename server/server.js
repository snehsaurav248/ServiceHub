require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const authRoutes = require("./routes/auth");  
const serviceRoutes = require("./routes/ServiceRoutes");  
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes"); // ✅ Added Order Routes

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// Use Routes
app.use("/cart", cartRoutes);
app.use("/auth", authRoutes);  
app.use("/services", serviceRoutes);  
app.use("/orders", orderRoutes); // ✅ Integrated Order Routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

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
const User = require("./models/User");  
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
