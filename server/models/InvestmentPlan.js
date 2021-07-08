const mongoose = require("mongoose");

const Investment_PlanSchema = new mongoose.Schema({
  title: String,
  email: String,
  description: String,
  condition: String,
});
// _id: mongoose.Schema.Types.ObjectId,
module.exports = mongoose.model("InvestmentPlan", Investment_PlanSchema);
