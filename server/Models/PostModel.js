const mongoose = require("mongoose")
const { Schema } = mongoose;

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A title is required"],
    },
    body: {
        type: String,
        required: [true, "A body is required"],
    },
    user: { 
        type: Schema.Types.ObjectId,
        ref: "User" ,
        required: true,
    },
}, { timestamps: true })

module.exports = mongoose.model("Posts", postSchema)