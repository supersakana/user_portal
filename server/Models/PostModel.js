const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A title is required"],
    },
    body: {
        type: String,
        required: [true, "A body is required"],
    },
}, { timestamps: true })

module.exports = mongoose.model("Posts", postSchema)