const mongoose = require("mongoose");

const User = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  roles: {
    Admin: { type: Number, default: 8675 },
    Editor: { type: Number, default: 3099 },
    User: { type: Number, default: 2022 },
  },
  refreshToken: { type: String },
});

const model = mongoose.model("UserData", User);

module.exports = model;
