const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 30,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 30,
  }
});

// Hash the password before saving to database
UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  });
  
  // Compare the password with the hashed password in the database
  UserSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    return bcrypt.compare(candidatePassword, user.password);
  };
  
  const User = mongoose.model("Users", UserSchema);
  module.exports = User;
