const mongoose = require("mongoose");

const Post_PlanSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  amount: Number,
  email: String,
  time: String,
  interestRate: Number,
  information: String,
  Startdate: String,
  br_number: String,
  startupName: String,
});

module.exports = mongoose.model("PostPlan", Post_PlanSchema);
