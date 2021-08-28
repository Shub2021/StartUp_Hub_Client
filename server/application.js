const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const application = express();

require("./models/Startup_Company");
require("./models/Startup_User");
require("./models/InvestmentPlan");
require("./models/Users");
require("./models/Cart");
require("./models/Investors");

const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const productRoutes = require("./routes/products");
const InvestPlanRoutes = require("./routes/plan");
const InvestorRegRoutes = require("./routes/investors");
const cartRoutes = require("./routes/cart");
const investor_requestRoutes = require("./routes/investor_request");
const startup_requestRoutes = require("./routes/startup_request");
const subscribetRoutes = require("./routes/subscribe");

application.use(bodyParser.json());

const Startup_Company = mongoose.model("Startup_Company");
const Startup_User = mongoose.model("Startup_User");
const Product = mongoose.model("Product");
const InvestmentPlan = mongoose.model("InvestmentPlan");
const Investors = mongoose.model("Investors");
const UserAuthentication = mongoose.model("Users");
const Cart = mongoose.model("Cart");

const mongoUri =
  "mongodb+srv://startupuser:AknzsBEIJHUfyULI@cluster0.qb28g.mongodb.net/userdb?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "userdb",
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongodb");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

mongoose.Promise = global.Promise;
application.use("/users", userRoutes);
application.use("/company", companyRoutes);
application.use("/product", productRoutes);
application.use("/plan", InvestPlanRoutes);
application.use("/investor", InvestorRegRoutes);
application.use("/cart", cartRoutes);
application.use("/investorrequest", investor_requestRoutes);
application.use("/startuprequest", startup_requestRoutes);
application.use("/subscribe", subscribetRoutes);

application.listen(3000, () => {
  console.log("server running");
});

mongoose.disconnect;
