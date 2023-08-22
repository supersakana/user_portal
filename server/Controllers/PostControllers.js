const PostModel = require("../Models/PostModel");
const User = require("../Models/UserModel")

module.exports.post = async (req, res, next) => {
    try {
        const { title, body, user } = req.body
        
        const post = await PostModel.create({ title, body, user })
        const currentUser = await User.findById(user._id)

        currentUser.posts = [...currentUser.posts, post]
        currentUser.save()

        console.log(currentUser.posts)
       
        res.status(201).json({ created:true })

    } catch(error) {
        res.json({ error, created: false })
    }
};