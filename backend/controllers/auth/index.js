const authController = require("./auth.controller")

exports.getUsers = async (req, res) => {
    let users
    try {
        users = await authController.findAll()
    } catch (err) {
        users = err
    }
    res.json(users)
}

exports.addUser = async (req, res) => {
    let user
    try {
        user = await authController.addOne(req.body)
    } catch (err) {
        user = err
    }
    res.json(user)
}