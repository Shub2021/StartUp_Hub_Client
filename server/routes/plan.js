const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
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
  const investmentPlan = new InvestmentPlan({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    minInvest: req.body.minInvest,
    maxInvest: req.body.maxInvest,
    interestTime: req.body.interestTime,
    interestRate: req.body.interestRate,
    description: req.body.description,
    condition: req.body.condition,
  });
  investmentPlan
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/delete", (req, res) => {
  investmentPlan
    .findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/update", (req, res) => {
  investmentPlan
    .findByIdAndUpdate(req.body.id, {
      title: req.body.title,
      minInvest: req.body.minInvest,
      maxInvest: req.body.maxInvest,
      interestTime: req.body.interestTime,
      interestRate: req.body.interestRate,
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
