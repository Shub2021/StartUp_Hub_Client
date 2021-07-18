const mongoose = require("mongoose");

const productListSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,
});

const CartSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  clientEmail: String,
  productList: [productListSchema],
});

module.exports = mongoose.model("Cart", CartSchema);
