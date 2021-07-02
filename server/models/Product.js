const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_name: String,
  product_category: String,
  picture: String,
  unitprice: Number,
  quantity: Number,
  description: String,
  br_number: String,
});

module.exports = mongoose.model("Product", ProductSchema);
