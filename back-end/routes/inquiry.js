var express = require("express");
var router = express.Router();

const InquiryModel = require("../models/Inquiry.js");

// GET all inquiries
router.get("/getInquiries", async (req, res) => {
  try {
    const inquiries = await InquiryModel.find();
    res.status(200).send(inquiries);
  } catch (err) {
    res.send(err);
  }
});

// POST an inquiry
router.post("/addInquiry", async (req, res) => {
  const { inquiryForm, product, date } = req.body;
  const inquiry = new InquiryModel({
    name: inquiryForm.name,
    email: inquiryForm.email,
    phone: inquiryForm.phone,
    company: inquiryForm.company,
    message: inquiryForm.message,
    productId: product._id,
    productName: product.name,
    date: date,
  });

  try {
    const savedInquiry = await inquiry.save();
    res.status(200).send("Inquiry saved successfully!");
  } catch (err) {
    res.send({ message: err });
  }
});

// DELETE an inquiry
router.delete("/deleteInquiry", async (req, res) => {
  const { inquiryId } = req.body;

  try {
    const deletedInquiry = await InquiryModel.findByIdAndDelete(inquiryId);
    res.status(200).send("Inquiry deleted successfully!");
  } catch (err) {
    res.send({ message: err });
  }
});

// PUT an inquiry as read
router.put("/setInquiryStatus", async (req, res) => {
  const { inquiryId, status } = req.body;
  try {
    await InquiryModel.findByIdAndUpdate(inquiryId, {
      read: status,
    });
    res.status(200).send("Inquiry marked as read successfully!");
  } catch (err) {
    res.send({ message: err });
  }
});

module.exports = router;
