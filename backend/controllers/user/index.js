const userController = require("./user.controller")

exports.getUsers = async (req, res) => {
    let users
    try {
        users = await userController.findAll()
    } catch (err) {
        users = err
    }
    res.json(users)
}

exports.getUserProfile = async (req, res) => {
    let user
    try {
        user = await userController.getProfile(req.params.username,req.auth)
    } catch (err) {
        user = err
    }
    res.json(user)
}

exports.setUserProfile = async (req,res ) => {
    let user
    try {
        user = await userController.setProfile(req.body,req.auth)
    } catch (err) {
        user = err
    }
    res.json(user)
}