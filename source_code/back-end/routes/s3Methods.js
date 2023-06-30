var express = require("express");
var router = express.Router();

const multer = require("multer");

const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region:  process.env.AWS_REGION,
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
        fs.unlinkSync(productImageFile.path);
      })
      .catch((error) => {
        res.send(error);
      });
  }
);

router.delete("/deleteImage/:mongoProductId", async (req, res) => {
  const s3 = new AWS.S3();
  const params = {
    Bucket: "healthkare",
    Key: "product-images/" + req.params.mongoProductId + ".jpeg",
  };

  s3.deleteObject(params)
    .promise()
    .then(() => {
      res.send({ message: "Delete Successful" });
    })
    .catch((error) => {
      res.send(error);
    });
});

module.exports = router;
