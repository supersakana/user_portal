const Post = require("../Models/PostModel");
const User = require("../Models/UserModel")

module.exports.post = async (req, res, next) => {
    try {
        const { title, body, user } = req.body

        const post = await Post.create({ title, body, user })
        const author = await User.findById(user._id)

        author.posts = [...author.posts, post]
        author.save()
       
        res.status(201).json({ author, created:true })

    } catch(error) {
        res.json({ error, created: false })
    }
};

// Make it so the front-end currentUser is updated too (This is working by figure out error on why post count dosn't display)

// Handle the DELETE method for posts (needs tot be dependent destroy)

// Display posts on the front end
