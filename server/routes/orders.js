const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Orders = require("../models/Order");
const Order = require("../models/Order");

router.get("/", (req, res, next) => {
  Orders.find()
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

router.get("/userorders/:userrEmail", (req, res, next) => {
  const client_id = req.params.userrEmail;
  console.log(client_id);
  Order.find({ client_id: client_id })
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
  const arr = [{ rate: 0, client: "none", comment: " " }];
  const order = new Orders({
    _id: new mongoose.Types.ObjectId(),
    product_name: req.body.product_name,
    product_id: req.body.product_id,
    br_number: req.body.br_number,
    order_status: req.body.order_status,
    req_date: req.body.req_date,
    unitprice: req.body.unitprice,
    expence: req.body.expence,
    quantity: req.body.quantity,
    total: req.body.total,
    payment_status: req.body.payment_status,
    client_id: req.body.client_id,
  });
  order
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Handling POST request to /order",
        createorder: order,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.delete("/:ordertId", (req, res, next) => {
  const id = req.params.ordertId;
  Order.remove({ _id: id })
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
router.get("/:brnumber", (req, res, next) => {
  const brnumber = req.params.brnumber;
  Order.find({ br_number: brnumber })
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
router.get("/orderId/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.findById(id)
    .exec()
    .then((doc) => {
      console.log(doc);

      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valide entry found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/:orderId", (req, res, next) => {
  const id = req.params.orderId;
  Order.findByIdAndUpdate(
    { _id: id },
    {
      order_status: req.body.order_status,
      payment_status: req.body.payment_status,
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
