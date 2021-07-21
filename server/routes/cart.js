const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Cart = require("../models/Cart");
const constants = require("../../constants/keys");

router.get("/", (req, res, next) => {
  Cart.find()
    .exec()
    .then((docs) => {
      // console.log(docs);
      res.status(200).json(docs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:userEmail", (req, res, next) => {
  const userEmail = req.params.userEmail;
  Cart.findOne({ clientEmail: userEmail })
    .exec()
    .then((docs) => {
      if (docs.length < 1) {
        const cart = new Cart({
          _id: new mongoose.Types.ObjectId(),
          clientEmail: userEmail,
          productList: [],
        });
        cart.save().then((result) => {
          res.status(200).json(result);
        });
      } else {
        console.log(docs);
        res.status(200).json(docs);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.patch("/:cartId", (req, res, next) => {
  console.log(req.body.arrayproduct);
  const id = req.params.cartId;
  Cart.findByIdAndUpdate(
    { _id: id },
    {
      productList: req.body.arrayproduct,
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

// router.post("/", (req,res, next) => {
//     _id: new mongoose.Types.ObjectId(),
//     clientId: req.body.clientId,
//     productList:
// });

module.exports = router;
