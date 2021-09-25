const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Stripe = require("stripe");

const PUBLISHABLE_KEY =
  "pk_test_51JU5UCKmGZodwyxaN1Q24PTRnjRGzL7ePprbwfx9Nf2yiSu5sPvBKhdoyjJjhCgNT6heMbpZiEKBxHW3t5A2FEIT00B6Dg98nj";
const SECRET_KEY =
  "sk_test_51JU5UCKmGZodwyxaNNfqAqBzTmdWslPJ2pyJpoZwkpfZuAtCiZXvgrktOb2lgOaauTyruNxitNy4bvFAn8DSCfjx00n9h0GjUi";
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });
router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 100000, //lowest denomination of particular currency
      currency: "lkr",
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});

module.exports = router;
