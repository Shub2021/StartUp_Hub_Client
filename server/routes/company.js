const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Company = require("../models/Startup_Company");
const bcrypt = require("bcrypt");

// ***************get all startup companies***************

router.get("/", (req, res, next) => {
  Company.find()
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

// ***************get all startup companies by br_number***************

router.get("/:br_number", (req, res, next) => {
  const br = req.params.br_number;
  Company.findOne({ br_number: br })
    .exec()
    .then((doc) => {
      if (doc) {
        return res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valide entry found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.get("/category/:category", (req, res, next) => {
  const category = req.params.category;
  Company.find({ category: category })
    .exec()
    .then((doc) => {
      console.log(doc);

      if (doc) {
        return res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valide entry found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
// router.post("/signup", (req, res, next) => {
//   User.find({ email: req.body.email })
//     .exec()
//     .then((user) => {
//       if (user.length >= 1) {
//         return res.status(409).json({
//           message: "Mail exists",
//         });
//       } else {
//         bcrypt.hash(req.body.password, 10, (err, hash) => {
//           if (err) {
//             return res.status(500).json({
//               error: err,
//             });
//           } else {
//             const user = new User({
//               br_number: req.body.br_number,
//               name: req.body.name,
//               email: req.body.email,
//               password: hash,
//             });
//             user
//               .save()
//               .then((result) => {
//                 console.log(result);
//                 res.status(201).json({
//                   message: "User created",
//                 });
//               })
//               .catch((err) => {
//                 console.log(err);
//                 res.status(500).json({ error: err });
//               });
//           }
//         });
//       }
//     });
// });

// ***************company registration***************

router.post("/", (req, res, next) => {
  const latitude = null;
  const longitude = null;
  const location = { lat: latitude, long: longitude };
  Company.find({ br_number: req.body.br_number })
    .exec()
    .then((company) => {
      if (company.length >= 1) {
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
            const company = new Company({
              _id: new mongoose.Types.ObjectId(),
              company_name: req.body.company_name,
              contact: req.body.contact,
              type: req.body.type,
              category: req.body.category,
              address: req.body.address,
              admin: req.body.admin,
              br_number: req.body.br_number,
              email: req.body.email,
              image:
                "https://res.cloudinary.com/hiruna/image/upload/v1627280049/startupHub/clipart1093235_wgyezv.png",
              location: location,
              password: hash,
            });
            company
              .save()
              .then((result) => {
                console.log(result);
                res.status(201).json({
                  message: "Company registered",
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

router.patch("/:companyID", (req, res, next) => {
  const companyID = req.params.companyID;
  Company.findByIdAndUpdate(
    { _id: companyID },
    {
      company_name: req.body.company_name,
      contact: req.body.contact,
      address: req.body.address,
      email: req.body.email,
      image: req.body.image,
      location: req.body.location,
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
router.patch("/partners/:companyID", (req, res, next) => {
  const companyID = req.params.companyID;
  Company.findByIdAndUpdate(
    { _id: companyID },
    {
      partners: req.body.partners,
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
