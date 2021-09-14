const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Service = require("../models/Service");

router.get("/", (req, res, next) => {
  Service.find({ company_status: "active" })
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

router.get("/:service_id", (req, res, next) => {
  const id = req.params.service_id;
  Service.find({ _id: id, company_status: "active"})
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



module.exports = router;
