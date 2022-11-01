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
        const data = await User.findOne({username:username})
        return auth ? data.toProfile(username==auth.username) : data.toProfile(false)
    } catch (err) {
        return err
    }
}

exports.setProfile = async (userInfo,auth) => {
    try {
        userInfo.avatar ? userInfo.avatar = auth.username + "_" + userInfo.avatar : null
        const data = await User.updateOne({uuid:auth.id},userInfo)    
        return {msg: "User updated correctyl", data: data}
    } catch (err) {
        return err
    }
}
