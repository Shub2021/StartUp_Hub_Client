const mongoose = require("mongoose");
const package = new mongoose.Schema({
  Package_type: String,
  price: Number,
  pk_discription: String,
});
const serviceSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  service_name: String,
  picture: String,
  service_type: String,
  br_number: String,
  //   quantity: Number,
  Description: String,
  company_status: String,
  package: [package],
});

module.exports = mongoose.model("Service", serviceSchema);
