const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");
const constants = require("../../constants/keys");

router.get("/", (req, res, next) => {
  Product.find()
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
router.post("/", (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    product_name: req.body.product_name,
    product_category: req.body.product_category,
    picture: req.body.picture,
    unitprice: req.body.unitprice,
    quantity: req.body.quantity,
    description: req.body.description,
    br_number: req.body.br_number,
  });
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /products",
        createProduct: product,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.get("/:category", (req, res, next) => {
  const category = req.params.category;
  Product.find({ product_category: category })
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

module.exports = router;
