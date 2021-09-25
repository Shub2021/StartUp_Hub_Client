const mongoose = require("mongoose");
const RatingSchema = new mongoose.Schema({
  rate: Number,
  client: String,
  clientId: String,
  comment: String,
});

const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_name: String,
  product_category: String,
  company_category: String,
  picture: String,
  expence: Number,
  unitprice: Number,
  quantity: Number,
  description: String,
  avg_rate: Number,
  company_status: String,
  br_number: String,
  rating: [RatingSchema],
});

module.exports = mongoose.model("Product", ProductSchema);
