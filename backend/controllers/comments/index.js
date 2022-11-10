const commentsController = require("./comments.controller")

exports.getComments = async (req,res) => {
    let comments
    try {
        comments = await commentsController.findAll()
    } catch (error) {
        comments = error
    }
    res.json(comments)
} 
exports.getComment = async (req,res) => {
    let comment
    try {
        comment = await commentsController.findOne(req.params.idProduct)
    } catch (err) {
        comment = err
    }
    res.json(comment)
}

exports.addComment = async (req,res) => {
    let comment
    try {
        comment = await commentsController.addOne(req.body,req.auth)
    } catch (err) {
        comment = err
    }
    res.json(comment)
}

exports.deleteComment = async (req,res) => {
    let comment
    try {
        comment = await commentsController.deleteOne(req.params.idProduct)
    } catch (err) {
        comment = err
    }
    res.json(comment)
}