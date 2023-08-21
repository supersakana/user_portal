const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const app = express()
const cookieParser = require("cookie-parser")

// Routes
const authRoutes = require("./Routes/AuthRoutes")
const postRoutes = require("./Routes/PostRoutes")

require('dotenv').config()
const db = process.env.DB_CONN

app.listen(4000, () => {
    console.log("Server started on PORT 4000")
})

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DB Connection Successful")
})
.catch((error) => {
    console.log(error.message)
})
// set up new db and make sure this is connected propely in production

app.use(
    cors({
        origin: ["http://localhost:3000"],
        method: ["GET", "POST"],
        credentials: true
    })
)
// ^^^ needs to be edited based on env

app.use(cookieParser())
app.use(express.json())


app.use("/", authRoutes)
app.use("/", postRoutes)