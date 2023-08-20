const UserModel = require("../Models/UserModel")
const jwt = require("jsonwebtoken")
const maxAge = 3 * 24 * 60 * 60 // 3 days

const createToken = (id) => {
    return jwt.sign({ id }, "secret_key", {
        expiresIn: maxAge,
    })
}

const handleErrors = (error) => {
    let errors = { username: "", email: "", password: "" }

    if(error.message === "Incorrect email"){
		errors.email = "Incorrect email or username"
	}

	if(error.message === "Incorrect password"){
		errors.password = "Password is incorrect"
	}

    if(error.code === 11000){
        Object.keys(error.keyPattern).forEach((key) => {
            const input = key.charAt(0).toUpperCase()+ key.slice(1)
            errors[key] = `${input} is already registered`
        })
    }
    if(error.message.includes("Users validation failed")){
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message
        })
    }
    return errors
}

module.exports.register = async (req, res, next) => {
    try{
        const { username, email, password } = req.body
        const user = await UserModel.create({ username, email, password })
        const token = createToken(user._id)

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000,
        })

        res.status(201).json({ user: user._id, created: true })

    } catch(error) {
        const errors = handleErrors(error)
        res.json({ errors, created: false})
    }
};

module.exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.login(email, password)
        const token = createToken(user._id)

        res.cookie("jwt", token, {
            withCredentials: true,
            httpOnly: false,
            maxAge: maxAge * 1000
        })

        res.status(200).json( {user:user._id, created:true })

    } catch(error) {
        const errors = handleErrors(error)
        res.json({ errors, created: false })

    }
};