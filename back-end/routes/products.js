var express = require("express");
var router = express.Router();

const ProductModel = require("../models/Product.js");

router.get("/getProductsCount", async (req, res) => {
  try {
    const productCount = await ProductModel.countDocuments({});
    res.send({ count: productCount });
  } catch (err) {
    console.log(err);
  }
});

router.get("/getAllProducts", async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.send(products);
  } catch (err) {
    console.log(err);
  }
});

router.get("/getProduct/:product_id", async (req, res) => {
  const productId = req.params.product_id;
  try {
    const product = await ProductModel.findById(productId);
    res.send(product);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
