const mongoose = require("mongoose");

const SubscribeSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  startupId: String,
  investorEmail: String,
});

module.exports = mongoose.model("Subscribe", SubscribeSchema);
