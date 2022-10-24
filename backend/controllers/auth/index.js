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

exports.register = async (req, res) => {
    let user
    try {
        user = await authController.register(req.body)
    } catch (err) {
        user = err
    }
    res.json(user)
}

exports.login = async (req,res) => {
    let user 
    try {
        user = await authController.login(req.body)
    } catch (err) {
        user = err
    }
    res.json(user)
}

exports.deleteUser = async (req,res) => {
    let data
    try {
        data = await authController.deleteOne(req.params.uuid)
    } catch (err) {
        data = err
    }
    res.json(data)
}

exports.getToken = async (req,res) => {

    res.json(req.headers.authorization)
}