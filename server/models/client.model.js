const mongoose = require("mongoose");

const Client = new mongoose.Schema(
  {
    user: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    pwd: { type: String, required: true },
    matchPwd: { type: String },
    accountType: { type: String, required: true },
    accountNumber: { type: Number },
    balance: { type: Number },
    transactions: {
      amount: { type: Number , required: true},
      balance: { type: Number, required: true },
      transactionDate: { type: Date},
      transactionType: { type: String},
      accountType: { type: String },
    },
    roles: {
      Admin: { type: Number }, //default: 8675
      Editor: { type: Number }, //default:3099
      User: { type: Number, default: 2022 },  
    },
    refreshToken: { type: String },
    cookie: { type: String },
  }
);

const model = mongoose.model("Client", Client);

module.exports = model;
