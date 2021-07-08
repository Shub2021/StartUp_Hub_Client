const mongoose = require("mongoose");

const Users_schema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  userId: String,
  products: String,
  password: String,
  type: String,
});

module.exports = mongoose.model("Users", Users_schema);
