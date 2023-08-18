const UserModel = require("../Models/UserModel")
const jwt = require("jsonwebtoken")
const maxAge = 3 * 24 * 60 * 60 // 3 days

const createToken = (id) => {
    return jwt.sign({ id }, "secret_key", {
        expiresIn: maxAge,
    })
}

module.exports.register = async (req, res, next) => {
    try{
        const { email, password } = req.body
        const user = await UserModel.create({ email, password })
        const token = createToken(user._id)

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        })

        res.status(201).json({ user: user._id, created: true })

    } catch(error) {
        console.log(error.message)
    }
};

module.exports.login = async (req, res, next) => {};