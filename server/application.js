const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const application = express();

require("./models/Startup_Company");
require("./models/Startup_User");
<<<<<<< HEAD
require("./models/InvestmentPlan");

application.use(bodyParser.json());

=======
require("./models/Users");
>>>>>>> 02ad7ab248bc1a8f931656aeb142cc431d16c72a
const userRoutes = require("./routes/user");
const companyRoutes = require("./routes/company");
const productRoutes = require("./routes/products");
const InvestPlanRoutes = require("./routes/plan");

const Startup_Company = mongoose.model("Startup_Company");
const Startup_User = mongoose.model("Startup_User");
const Product = mongoose.model("Product");
<<<<<<< HEAD
const InvestmentPlan = mongoose.model("InvestmentPlan");
=======
const UserAuthentication = mongoose.model("Users");
>>>>>>> 02ad7ab248bc1a8f931656aeb142cc431d16c72a

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

application.listen(3000, () => {
  console.log("server running");
});

mongoose.disconnect;
