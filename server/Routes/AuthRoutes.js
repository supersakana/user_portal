const { register, login } = require("../Controllers/AuthControllers")
const { checkUser } = require("../Middleware/AuthMiddleware")

const router = require("express").Router()

router.post("/", checkUser)
router.post("/login", login)
router.post("/register", register)

module.exports = router