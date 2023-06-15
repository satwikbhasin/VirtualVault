const multer = require("multer");
const fs = require("fs");

var express = require("express");
var router = express.Router();
const upload = multer({ dest: "uploads/" });

const ProductModel = require("../models/Product.js");

const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAS2AX2XP255FMJ7LI",
  secretAccessKey: "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",
  region: "us-east-1",
});

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
    await product.save().then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

router.post(
  "/uploadImage/:mongoProductId",
  upload.single("image"),
  async (req, res) => {
    const s3 = new AWS.S3();
    const productImageFile = req.file;

    const fileData = fs.readFileSync(productImageFile.path);

    const params = {
      Bucket: "healthkare",
      Key: "product-images/" + req.params.mongoProductId + ".jpeg",
      Body: fileData,
    };

    s3.upload(params)
      .promise()
      .then((data) => {
        res.send(data.Location);
      })
      .catch((error) => {
        res.send(error);
      });
  }
);

router.put("/update/", async (req, res) => {
  const id = req.body.id;
  const newName = req.body.updatedName;
  const newPrice = req.body.updatedPrice;
  const newDescription = req.body.updatedDescription;

  try {
    await ProductModel.updateOne(
      { _id: id },
      {
        name: newName,
        price: newPrice,
        description: newDescription,
      }
    );
    res.status(200);
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
    ).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
