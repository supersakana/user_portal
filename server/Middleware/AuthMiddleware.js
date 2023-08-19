const User = require("../Models/UserModel")
const jwt = require("jsonwebtoken")

module.export.checkUser = (req, res, next) => {
    const token = req.cookies.jwt
    if(token) {
        jwt.verify(token, "secret_key", async (error, decoded) => {
            if(error) {
                res.json({ status: false })
                next()
            } else {
                const user = await User.findById(decoded.id)

                if(user){
                    res.json({ status: true, user: user.email })
                } else {
                    res.json({ status: false })
                    next()
                }
            }
        })
    } else {
        res.json({ status: false })
    }
}