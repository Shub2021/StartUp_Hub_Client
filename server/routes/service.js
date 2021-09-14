const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Service = require("../models/Service");
<<<<<<< HEAD
const constants = require("../../constants/keys");

router.get("/", (req, res, next) => {
  Service.find()
=======

router.get("/", (req, res, next) => {
  Service.find({ company_status: "active" })
>>>>>>> ab6ae8f6b4cb3b38dba277109b227b7b73eaca2f
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
<<<<<<< HEAD
  Service.findOne({ _id: id })
=======
  Service.find({ _id: id, company_status: "active"})
>>>>>>> ab6ae8f6b4cb3b38dba277109b227b7b73eaca2f
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

<<<<<<< HEAD
router.post("/", (req, res, next) => {
  const arr = [];
  const service = new Service({
    _id: new mongoose.Types.ObjectId(),
    service_name: req.body.Service_name,
    picture: req.body.picture,
    service_type: req.body.Service_type,
    Description: req.body.Description,
    br_number: req.body.br_number,
    company_status: "active",
    package: arr,
  });
  service
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /service",
        createService: service,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.delete("/:serviceId", (req, res, next) => {
  const id = req.params.serviceId;
  Service.remove({ _id: id })
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

router.patch("/:serviceID", (req, res, next) => {
  const id = req.params.serviceID;
  Service.findByIdAndUpdate(
    { _id: id },
    {
      service_name: req.body.Service_name,
      picture: req.body.picture,
      service_type: req.body.Service_type,
      Description: req.body.Description,
      package: req.body.package_type,
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

router.patch("/package/:serviceID", (req, res, next) => {
  const id = req.params.serviceID;
  Service.findByIdAndUpdate(
    { _id: id },
    {
      package: req.body.package,
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
router.patch("/ban/:br_number", (req, res, next) => {
  const id = req.params.br_number;
  Service.findByIdAndUpdate(
    { br_number: id },
    {
      company_status: "banned",
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

router.get("/br/:service_id", (req, res, next) => {
  const id = req.params.service_id;
  Service.find({ br_number: id })
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
=======

>>>>>>> ab6ae8f6b4cb3b38dba277109b227b7b73eaca2f

module.exports = router;
