const mongoose = require("mongoose");

const Investment_PlanSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  contact: Number,
  email: String,
  interestRate: String,
  description: String,
  condition: String,
});

module.exports = mongoose.model("InvestmentPlan", Investment_PlanSchema);
