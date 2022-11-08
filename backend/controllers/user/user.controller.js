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

exports.getProfile = async (username,path,auth) => {
    try {
        let data
        switch (path) {
            case "profile":
                data = await User.findOne({username:username})
                const user = await User.findOne({uuid:auth.id}).populate("following")
                user.following.map(user => user.uuid == data.uuid ? data.userFollow = true : null)
                break;
            case "likes":
                data = await User.findOne({username:username}).populate("likes")
                data.likes.map(product => product.userLike = true)
                break;
            case "following":
                data = await User.findOne({username:username}).populate("following")
                data.following.map(user => user.userFollow = true)
                break;
            default:
                data = await User.findOne({username:username})
                break;
        }
        return auth ? data.toProfile(username==auth.username) : data.toProfile(false)
    } catch (err) {
        return err
    }
}

exports.setProfile = async (userInfo,auth) => {
    try {
        const data = await User.findOneAndUpdate({uuid:auth.id},{$set:{email:userInfo.email,bio:userInfo.bio,avatar:userInfo.avatar}})    
        return {msg: "User updated correctyl", user: data.toProfile(true)}
    } catch (err) {
        return err
    }
}

exports.setUserImage = async (filename,auth) =>{
    try {
        const data = await User.findOneAndUpdate({uuid:auth.id},{$set:{avatar:filename}})
        return data
    } catch (err) {
        return err
    }
}


exports.modFollow = async (username,auth) => {
    try {
        let following = false
        const user = await User.findOne({uuid:auth.id}).populate("following")
        const userFollow = await User.findOne({username})
        
        user.following.map(user => user.uuid == userFollow.uuid ? following = true : null)

        if (following) {
            await User.findOneAndUpdate({uuid:auth.id},{$pull:{"following":userFollow._id}})
            await User.findOneAndUpdate({username},{$inc:{"followers":-1}})
            return false
        } else {
            await User.findOneAndUpdate({uuid:auth.id},{$push:{"following":userFollow._id}})
            await User.findOneAndUpdate({username},{$inc:{"followers":1}})
            return true
        }
    } catch (err) {
        return err
    }
}
