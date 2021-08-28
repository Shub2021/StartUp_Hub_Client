const mongoose = require("mongoose");

const Investor_RequestSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  startupId: String,
  investorEmail: String,
});

module.exports = mongoose.model("Investor_Request", Investor_RequestSchema);
