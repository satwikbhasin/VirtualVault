var express = require("express");
var router = express.Router();

const multer = require("multer");

const fs = require("fs");
const upload = multer({ dest: "uploads/" });
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: "AKIAS2AX2XP255FMJ7LI",
  secretAccessKey: "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",
  region: "us-east-1",
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

module.exports = router;
