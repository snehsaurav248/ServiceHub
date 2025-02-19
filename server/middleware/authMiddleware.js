const jwt = require("jsonwebtoken");
const User = require("../models/User");

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

const authorizeAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ error: "❌ Forbidden: Admin access required" });
    }
    next();
  } catch (error) {
    console.error("❌ Authorization Error:", error.message);
    res.status(500).json({ error: "❌ Server error" });
  }
};

module.exports = { authenticate, authorizeAdmin };
