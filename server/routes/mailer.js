const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false, // use SSL
  port: 25,
  auth: {
    user: "StartupHub21@gmail.com",
    pass: "shub@2021",
  },
  tls: {
    rejectUnauthorized: false,
  },
});
router.post("/", (req, res, next) => {
  let mailOptions = {
    from: "StartupHub21@gmail.com",
    to: "samith.wss@gmail.com",
    subject: "Password Recovery",
    text: "Verification Code : " + req.body.code,
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error" + err);
    } else {
      console.log("Email Sent");
      res.status(201).json({
        message: "Email Sent",
      });
    }
  });
});
router.post("/addmember/", (req, res, next) => {
  let mailOptions = {
    from: "StartupHub21@gmail.com",
    to: "hirujayasuriya98@gmail.com",
    subject: "Accout Activation",
    text:
      "Please use your email and the following verification code as the password for login on Startup Hub. \nVerification Code :" +
      req.body.code +
      "\nOnce you logged in for the first time we highly recomend you to change your password.",
  };
  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      console.log("Error" + err);
    } else {
      console.log("Email Sent");
    }
  });
  res.status(201).json({
    message: "Email Sent",
  });
});

module.exports = router;
