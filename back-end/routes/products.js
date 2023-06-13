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

router.post("/insert/", async (req, res) => {
  const productName = req.body.productName;
  const productPrice = req.body.productPrice;
  const productImage = req.body.productImage;
  const productDescription = req.body.productDescription;

  const product = new ProductModel({
    name: productName,
    price: productPrice,
    image: productImage,
    description: productDescription,
  });
  try {
    await product.save();
  } catch (err) {
    console.log(err);
  }
});

router.put("/update/", async (req, res) => {
  const id = req.body.id;
  const newName = req.body.updatedName;
  const newPrice = req.body.updatedPrice;
  const newDescription = req.body.updatedDescription;
  console.log(id);

  try {
    await ProductModel.updateOne(
      { _id: id },
      {
        name: newName,
        price: newPrice,
        description: newDescription,
      }
    );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
