const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        maxlength: [40, "Maximum length for name is 40 characters"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "This email is already registered"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model("User", UserSchema);