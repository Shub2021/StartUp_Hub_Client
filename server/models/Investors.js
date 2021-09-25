const mongoose = require("mongoose");

const Investor_RegSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  cName: String,
  investArea: String,
  cAddress: String,
  nic: Number,
  cTel: Number,
  email: String,
});

module.exports = mongoose.model("Investors", Investor_RegSchema);
