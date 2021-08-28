const mongoose = require("mongoose");

const Startup_RequestSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  startupId: String,
  investorEmail: String,
});

module.exports = mongoose.model("Startup_Request", Startup_RequestSchema);
