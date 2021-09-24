const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Investors = require("../models/Investors");

router.get("/", (req, res) => {
  Investors.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:email", (req, res, next) => {
  const email = req.params.email;
  Investors.findOne({ email: email })
    .exec()
    .then((docs) => {
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
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
    email: req.body.email,
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
  Investors.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.patch("/update/:id", (req, res) => {
  const id = req.params.id;
  Investors.findByIdAndUpdate(id, {
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
