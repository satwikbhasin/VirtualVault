const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 30
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
});

const User = mongoose.model("Users", UserSchema);
module.exports = User;