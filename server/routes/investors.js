const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const constants = require("../../constants/keys");
const Investors = require("../models/Investors");

router.get("/", (req, res) => {
  Investors.findOne({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/send", (req, res) => {
  const investors = new Investors({
    _id: new mongoose.Types.ObjectId(),
    cName: req.body.cName,
    investArea: req.body.investArea,
    cAddress: req.body.cAddress,
    nic: req.body.nic,
    cTel: req.body.cTel,
  });
  investors
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
  investors
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
  investors
    .findByIdAndUpdate(req.body.id, {
      _id: new mongoose.Types.ObjectId(),
      cName: req.body.cName,
      investArea: req.body.investArea,
      cAddress: req.body.cAddress,
      nic: req.body.nic,
      cTel: req.body.cTel,
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
