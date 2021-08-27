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
router.get("/:email", (req, res) => {
  const email = req.params.email;
  InvestmentPlan.find({ investorEmail: email })
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
    investorEmail: req.body.email,
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

router.patch("/:planID", (req, res, next) => {
  const id = req.params.planID;
  InvestmentPlan.findByIdAndUpdate(
    { _id: id },
    {
      title: req.body.title,
      minInvest: req.body.minInvest,
      maxInvest: req.body.maxInvest,
      interestTime: req.body.interestTime,
      interestRate: req.body.interestRate,
      description: req.body.description,
      condition: req.body.condition,
    }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
