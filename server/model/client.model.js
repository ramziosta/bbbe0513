const mongoose = require("mongoose");

const User = new mongoose.Schema({
  user: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pwd: { type: String, required: true },
  matchPwd: { type: String },
  accountType: { type: String, required: true },
  accountNumber: { type: Number },
  created: { type: Date },
  balance: { type: Number },
  transactions: [
    {
      amount: { type: Number },
      transactionDate: { type: Date },
      transactionType: { type: String },
    },
  ],
  roles: {
    Admin: { type: Number }, //default: 8675
    Editor: { type: Number }, //default:3099
    User: { type: Number, default: 2022 },
  },
  refreshToken: { type: String },
  cookie: { type: String },
});

const model = mongoose.model("User", User);

module.exports = model;
