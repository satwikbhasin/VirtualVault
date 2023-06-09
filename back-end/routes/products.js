var express = require("express");
var router = express.Router();

const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://healthkare:Thumbsup10@healthkare.mlizocs.mongodb.net/Healthkare",
    {
      useNewURLParser: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  });

const ProductModel = require("../models/Product.js");

router.get("/getAllProducts", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.send(products);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
