const mongoose = require("mongoose");

const ViewPost_PlanSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  amount: Number,
  email: String,
  payBackPeriod: String,
  interestRate: Number,
  information: String,
  startDate: String,
  brNumber: String,
});

module.exports = mongoose.model("View_Post_Plan", ViewPost_PlanSchema);
