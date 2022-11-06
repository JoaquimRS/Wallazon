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
            case "likes":
                data = await User.findOne({username:username}).populate("likes")
                data.likes.map(product => product.userLike = true)
                break;
            case "profile":
                data = await User.findOne({username:username})
                const user = await User.findOne({uuid:auth.id}).populate("following")
                user.following.map(user => user.uuid == data.uuid ? data.userFollow = true : null)
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
        return {msg: "User updated correctyl", user: data.toAuthJSON()}
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
            return flase
        } else {
            console.log(userFollow._id);
            await User.findOneAndUpdate({uuid:auth.id},{$push:{"following":userFollow._id}})
            await User.findOneAndUpdate({username},{$inc:{"followers":1}})
            return true
        }
    } catch (err) {
        return err
    }
}
