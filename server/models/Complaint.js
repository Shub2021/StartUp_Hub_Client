const mongoose = require("mongoose");

const ComplaintSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  client_email: String,
  br_number: String,
  item_id: String,
  description: String,
  status: String,
  placed_date: String,
});

module.exports = mongoose.model("Complaint", ComplaintSchema);
