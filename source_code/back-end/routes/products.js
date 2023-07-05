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
  const productImage = req.body.productImage;
  const productDescription = req.body.productDescription;

  const product = new ProductModel({
    name: productName,
    image: productImage,
    description: productDescription,
  });
  try {
    await product.save().then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.put("/update/", async (req, res) => {
  const id = req.body.id;
  const newName = req.body.updatedName;
  const newDescription = req.body.updatedDescription;

  try {
    await ProductModel.updateOne(
      { _id: id },
      {
        name: newName,
        description: newDescription,
      }
    ).then(() => {
      res.status(200).send("Update successful");
    });
  } catch (error) {
    res.send(error);
  }
});

router.put("/updateImage/", async (req, res) => {
  const id = req.body.id;
  const newImage = req.body.image;

  try {
    await ProductModel.updateOne(
      { _id: id },
      {
        image: newImage,
      }
    ).then(() => {
      res.status(200).send("Update Successful");
    });
  } catch (error) {
    res.send(error);
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await ProductModel.deleteOne({ _id: id }).then(() => {
      res.send(200);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
