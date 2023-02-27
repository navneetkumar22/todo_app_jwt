const mongoose = require("mongoose");
const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxlength: [40, "Maximum length allowed for title is 40 characters"],
        unique: [true, "Similar todo is already created"]
    },
    tasks: [{
        taskTitle: String
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model("Todo", TodoSchema);