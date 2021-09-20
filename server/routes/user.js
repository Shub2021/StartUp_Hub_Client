const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");
const constants = require("../../constants/keys");

router.get("/", (req, res, next) => {
  User.find()
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

router.post("/signup", (req, res, next) => {
  console.log(req.body);
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Mail exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              email: req.body.email,
              password: hash,
              type: req.body.type,
            });
            user
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "User created",
                });
              })
              .catch((err) => {
                console.log(err);
                res.status(500).json({ error: err });
              });
          }
        });
      }
    });
});

router.post("/login", (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth faild",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth faild",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
              username: user[0].name,
            },
            constants.jwtkey,
            {
              expiresIn: "1d",
            }
          );

          return res.status(200).json({
            message: "Auth successful",
            token: token,
            name: user[0].name,
            type: user[0].type,
            email: user[0].email,
            userId: user[0]._id,
          });
        }
        res.status(401).json({
          message: "Auth faild",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/:userId", (req, res, next) => {
  const userId = req.params.userId;
  User.findOne({ _id: userId })
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

router.patch("/forgot/:userID", (req, res, next) => {
  const id = req.params.userID;
  User.find({ email: id })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Reset faild a",
        });
      }

      bcrypt.hash(req.body.newpass, 10, (err, hash) => {
        if (err) {
          return res.status(500).json({
            message: "Reset faild b",
          });
        } else {
          User.findOneAndUpdate(
            { email: id },
            {
              password: hash,
            }
          )
            .exec()
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
              res.status(500).json({ error: err });
            });

          return res.status(200).json({
            message: "Reset successful",
          });
        }
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;
