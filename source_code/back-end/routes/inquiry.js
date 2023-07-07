var express = require("express");
var router = express.Router();

const InquiryModel = require("../models/Inquiry.js");
const { Console } = require("console");

// GET all inquiries
router.get("/getInquiries", async (req, res) => {
  try {
    const inquiries = await InquiryModel.find();
    console.log(inquiries);
    res.status(200).send(inquiries);
  } catch (err) {
    res.send(err);
  }
});

// // GET a specific inquiry
// router.get("/:inquiryId", async (req, res) => {
//   try {
//     const inquiry = await InquiryModel.findById(req.params.inquiryId);
//     res.json(inquiry);
//   } catch (err) {
//     res.json({ message: err });
//   }
// });

// POST an inquiry
router.post("/addInquiry", async (req, res) => {
  const { inquiryForm, product } = req.body;
  const inquiry = new InquiryModel({
    name: inquiryForm.name,
    email: inquiryForm.email,
    phone: inquiryForm.phone,
    company: inquiryForm.company,
    message: inquiryForm.message,
    productId: product._id,
    productName: product.name,
  });

  try {
    const savedInquiry = await inquiry.save();
    res.status(200).send("Inquiry saved successfully!");
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
