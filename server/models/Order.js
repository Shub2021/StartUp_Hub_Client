const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  product_name: String,
  product_id: String,
  br_number: String,
  order_status: String,
  req_date: String,
  unitprice: Number,
  expence: Number,
  quantity: Number,
  total: Number,
  payment_status: String,
  client_id: String,
});

module.exports = mongoose.model("Order", OrderSchema);
