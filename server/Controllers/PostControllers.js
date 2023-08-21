module.exports.post = async (req, res, next) => {
    try {
        const { title, body } = req.body

        console.log(`${title} - ${body}`)
       
        res.status(200).json( { created:true })

    } catch(error) {
        console.log(`${title} - ${body}`)
        
        res.json({ error, created: false })
    }
};