const PostModel = require("../Models/PostModel");

module.exports.post = async (req, res, next) => {
    try {
        const { title, body, user } = req.body
        const post = await PostModel.create({ title, body, user })
       
        res.status(201).json( { post: post, created:true })

    } catch(error) {
        res.json({ error, created: false })
    }
};