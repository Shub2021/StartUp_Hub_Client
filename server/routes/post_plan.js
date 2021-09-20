const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const constants = require("../../constants/keys");
const PostPlan = require("../models/PostPlan");

router.get("/", (req, res) => {
  PostPlan.findOne({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/:email/:br", (req, res) => {
  const email = req.params.email;
  const br = req.params.br;
  PostPlan.find({ email: email, br_number: br })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:email", (req, res) => {
  const email = req.params.email;
  PostPlan.find({ email: email })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/send", (req, res) => {
  const postplan = new PostPlan({
    _id: new mongoose.Types.ObjectId(),
    amount: req.body.amount,
    email: req.body.email,
    time: req.body.time,
    interestRate: req.body.interestRate,
    information: req.body.information,
    Startdate: req.body.Startdate,
    br_number: req.body.br_number,
    startupName: req.body.startupName,
  });
  postplan
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:startupId/:investorEmail", (req, res, next) => {
  const startupId = req.params.startupId;
  const investorEmail = req.params.investorEmail;
  PostPlan.deleteMany({ br_number: startupId, email: investorEmail })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.patch("/:planID", (req, res, next) => {
  const id = req.params.planID;
  PostPlan.findByIdAndUpdate(
    { _id: id },
    {
      amount: req.body.amount,
      email: req.body.email,
      time: req.body.time,
      interestRate: req.body.interestRate,
      information: req.body.information,
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
