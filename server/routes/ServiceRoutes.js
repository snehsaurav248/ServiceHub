const express = require("express");
const multer = require("multer");
const Service = require("../models/Service");
const { authenticate, authorizeAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

// ✅ Multer setup for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// ✅ Add a new service (Admin only)
router.post("/", authenticate, authorizeAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : null; // Image path

    if (!name || !description || !price) {
      return res.status(400).json({ error: "❌ All fields are required" });
    }

    const newService = new Service({ name, description, price, image, createdBy: req.user.id });
    await newService.save();

    res.status(201).json({ message: "✅ Service added successfully", service: newService });
  } catch (error) {
    console.error("❌ Error adding service:", error);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// ✅ Get all services (Public)
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().populate("createdBy", "name email");
    res.status(200).json(services);
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// ✅ Get a specific service by ID
router.get("/:id", async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).populate("createdBy", "name email");
    if (!service) return res.status(404).json({ error: "❌ Service not found" });

    res.status(200).json(service);
  } catch (error) {
    console.error("❌ Error fetching service:", error);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// ✅ Update a service (Admin only)
router.put("/:id", authenticate, authorizeAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const image = req.file ? req.file.path : undefined; // Avoid updating if no new image

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price, ...(image && { image }) },
      { new: true }
    );

    if (!updatedService) return res.status(404).json({ error: "❌ Service not found" });

    res.status(200).json({ message: "✅ Service updated successfully", service: updatedService });
  } catch (error) {
    console.error("❌ Error updating service:", error);
    res.status(500).json({ error: "❌ Server error" });
  }
});

// ✅ Delete a service (Admin only)
router.delete("/:id", authenticate, authorizeAdmin, async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) return res.status(404).json({ error: "❌ Service not found" });

    res.status(200).json({ message: "✅ Service deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting service:", error);
    res.status(500).json({ error: "❌ Server error" });
  }
});

module.exports = router;
