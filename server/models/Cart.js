const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  clientEmail: String,
  productList: [],
});

module.exports = mongoose.model("Cart", CartSchema);
