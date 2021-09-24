const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Product = require("../models/Product");

router.get("/", (req, res, next) => {
  Product.find({ company_status: "active" })
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
router.get("/br/:br", (req, res, next) => {
  const br = req.params.br;
  Product.find({ br_number: br, company_status: "active" })
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
  Product.find({ product_category: category, company_status: "active" })
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

router.get("/getProductbyID/:productID", (req, res, next) => {
  const productID = req.params.productID;
  Product.findOne({ _id: productID, company_status: "active" })
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

router.patch("/:productID", (req, res, next) => {
  const productID = req.params.productID;
  Product.findByIdAndUpdate(
    { _id: productID },
    {
      rating: req.body.rating,
      avg_rate: req.body.avg_rate,
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
