const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  profilePic: String,
  role: { type: String, default: "user", enum: ["user", "admin"] },
});

module.exports = mongoose.model("User", UserSchema);
