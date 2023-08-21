const mongoose = require("mongoose")
const { Schema } = mongoose;
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is required"],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    posts: [{ 
        type: Schema.Types.ObjectId, 
        ref: "Post" 
    }],
}, { timestamps: true })

userSchema.pre("save", async function (next) {
    const salt = await bcrypt.genSalt()
    this.password = await bcrypt.hash(this.password, salt)
})

userSchema.statics.login = async function (email, password) {
    let user = await this.findOne({ email })
    if(!user) user = await this.findOne({ username: email })

    if(user) {
        const auth = await bcrypt.compare(password, user.password)
        if(auth) {
            return user
        }
        throw Error("Incorrect password")
    }
    throw Error("Incorrect email")
}

module.exports = mongoose.model("Users", userSchema)