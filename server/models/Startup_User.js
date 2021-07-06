const mongoose = require("mongoose");

const Startup_UserSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  br_number: String,
  email: String,
  name: String,
  password: String,
});

module.exports = mongoose.model("Startup_User", Startup_UserSchema);
