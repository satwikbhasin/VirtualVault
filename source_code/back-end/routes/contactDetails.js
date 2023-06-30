var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");

const ContactModel = require("../models/Contact.js");

router.get("/getContactDetails", async (req, res) => {
  try {
    const contactDetails = await ContactModel.find({});
    res.send(contactDetails);
  } catch (err) {
    console.log(err);
  }
});

router.put("/updateContactDetails", async (req, res) => {
  const { name, email, whatsapp, phone } = req.body;
  try {
    const contactDetails = await ContactModel.find({});
    const contact = contactDetails[0];

    if (name) {
      contact.name = name;
    }
    if (email) {
      contact.email = email;
    }
    if (whatsapp) {
      contact.whatsapp = whatsapp;
    }
    if (phone) {
      contact.phone = phone;
    }
    await contact.save();
    res.send(contact);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
