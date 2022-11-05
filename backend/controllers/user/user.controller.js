const e = require("express");
const { auth } = require("..");
const { User } = require("../../models/index")

exports.findAll = async () => {
    try {
        const data = await User.find()
        return data;
    } catch (err) {
        return err;
    }
}

exports.findOne = async (auth) => {
    try {
        const data = await User.findOne({username:auth.username})
        return data.toAuthJSON();
    } catch (err) {
        return err;
    }
}

exports.getProfile = async (username,auth) => {
    try {
        const data = await User.findOne({username:username}).populate("likes")
        data.likes.map(product => product.userLike = true)
        return auth ? data.toProfile(username==auth.username) : data.toProfile(false)
    } catch (err) {
        return err
    }
}

exports.setProfile = async (userInfo,auth) => {
    try {
        const data = await User.findOneAndUpdate({uuid:auth.id},{$set:{email:userInfo.email,bio:userInfo.bio,avatar:userInfo.avatar}})    
        return {msg: "User updated correctyl", user: data.toAuthJSON()}
    } catch (err) {
        return err
    }
}
