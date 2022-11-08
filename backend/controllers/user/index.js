const userController = require("./user.controller")
const fs = require("fs")
const {middlewareUpload} = require("../../middlewares")
const directoryPath = __basedir + "/resources/static/assets/uploads/";

exports.getUsers = async (req, res) => {
    let users
    try {
        users = await userController.findAll()
    } catch (err) {
        users = err
    }
    res.json(users)
}

exports.getUser = async (req, res) => {
    let user
    try {
        user = await userController.findOne(req.auth)
    } catch (err) {
        user = err
    }
    res.json(user)
}

exports.getUserProfile = async (req, res) => {
    let user
    try {
        user = await userController.getProfile(req.params.username,req.query.path,req.auth)
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


exports.changeFollow = async (req, res) => {
    let user
    try {
        user = await userController.modFollow(req.params.username,req.auth)
    } catch (err) {
        user = err
    }
    res.json(user)
}

exports.getUserImage = async (req, res) => {
    try {
        fs.readFile(directoryPath+req.params.userimage,(err,data)=>{
            res.writeHead(200, {'Content-Type': 'image/png'})
            res.end(data)
        })
    } catch (err) {
        res.json(err)
    }
}

exports.updateUserImage = async (req, res) => {
    try {    
        await middlewareUpload(req,res)
        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }
        await userController.setUserImage(req.file.filename,req.auth)
        res.json(req.file.filename)
    } catch (err) {
        res.json(err)
    }
}