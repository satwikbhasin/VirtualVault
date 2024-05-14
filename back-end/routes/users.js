var express = require("express");
var router = express.Router();
const jwt = require("jsonwebtoken");

const UserModel = require("../models/User.js");

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) {
      res.status(200).send({ message: "Email doesn't exist" });
    } else {
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        res.status(200).send({ message: "Wrong password" });
      } else {
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          "your-secret-key"
        );
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 3600000,
          })
          .send({ message: "success" })
          .status(200);
      }
    }
  } catch (err) {
    res.send({ message: "Server error" });
  }
});

router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    const user = new UserModel({ email, password });
    await user.save();

    // Send a success response
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    // Send an error response
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
