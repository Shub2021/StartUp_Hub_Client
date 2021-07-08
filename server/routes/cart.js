// const express = require("express");
// const router = express.Router();
// const mongoose = require("mongoose");
// const Cart = require("../models/Cart");
// const constants = require("../../constants/keys");

// router.get("/", (req, res, next) => {
//   Product.find()
//     .exec()
//     .then((docs) => {
//       // console.log(docs);
//       res.status(200).json(docs);
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// router.get("/:userID", (req, res, next) => {
//   const id = req.params.category;
//   Product.find({ clientId: id })
//     .exec()
//     .then((docs) => {
//       // console.log(docs);
//       if (docs) {
//         res.status(200).json(docs);
//       } else {
//         res.status(404).json({ message: "No valid entry found" });
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(500).json({
//         error: err,
//       });
//     });
// });

// module.exports = router;
