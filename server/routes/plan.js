const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const plan = require("../models/InvestmentPlan");
const constants = require("../../constants/keys");
const InvestmentPlan = require("../models/InvestmentPlan");

router.get("/", (req, res) => {
  InvestmentPlan.findOne({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/send", (req, res) => {
  const InvestmentPlan = new plan({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    contact: req.body.contact,
    email: req.body.email,
    interestRate: req.body.interestRate,
    description: req.body.description,
    condition: req.body.condition,
  });
  InvestmentPlan.save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/delete", (req, res) => {
  InvestmentPlan.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/update", (req, res) => {
  InvestmentPlan.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    contact: req.body.contact,
    email: req.body.email,
    description: req.body.description,
    condition: req.body.condition,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
