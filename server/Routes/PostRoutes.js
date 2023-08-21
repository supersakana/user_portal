const { post } = require("../Controllers/PostControllers")

const router = require("express").Router()

router.post("/post", post)


module.exports = router