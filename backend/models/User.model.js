var mongoose = require("mongoose");
var argon2 = require('argon2')
var CryptoJS = require("crypto-js")
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");
var jwt = require('jsonwebtoken')
var {secret} = require("../config")

const UserSchema = mongoose.Schema({
    uuid:{
        type:String,
        unique:true
    },
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
    },
    bio:{
        type:String,
        maxLength: 300
    },
    products:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Product"
    }],
    likes:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Product"
    }],
    followers:{
        type:Number
    },
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }]
})

UserSchema.plugin(uniqueValidator,{message:"is already taken"})

UserSchema.pre("validate", async function (next) {
    if (!this.uuid) {
        this.uuidGenerate()
    }
    if (this.avatar) {
        this.avatar = this.username + ".png"
    }
    this.password = await this.hashPassword()
    next()
})

UserSchema.methods.hashPassword = async function() {
    var bytes  = CryptoJS.AES.decrypt(this.password,secret);
    var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
    return argon2.hash(decryptedData)
}

UserSchema.methods.validatePassword = async function(password) {
    try {        
        var bytes  = CryptoJS.AES.decrypt(password,secret);
        var decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return await argon2.verify(this.password,decryptedData)
    } catch (error) {
        return error
    }
}

UserSchema.methods.uuidGenerate = function () {
    this.uuid = 
        'wallazon|' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
}

UserSchema.methods.generateToken = function () {
    var today = new Date()
    var exp = new Date(today)
    exp.setDate(today.getDate()+60)
    return jwt.sign({
        id: this.uuid,
        username: this.username,
        exp: parseInt(exp.getTime() / 1000)
    }, secret)
}

UserSchema.methods.toAuthJSON = function (){
    return {
        username: this.username,
        email: this.email,
        token: this.generateToken(),
        bio: this.bio,
        avatar: this.avatar
    }
}

UserSchema.methods.toProfile = function (owner) {
    if (owner) {
        return {
            username: this.username,
            email: this.email,
            bio: this.bio,
            avatar: this.avatar,
            products: this.products,
            likes: this.likes,
            followers: this.followers,
            following: this.following,
            userFollow: this.userFollow
        }
    } else {
        return {
            username: this.username,
            bio: this.bio,
            avatar: this.avatar,
            products: this.products,
            followers: this.followers,
            following: this.following,
            userFollow: this.userFollow
        }
    }
}
UserSchema.methods.toJSON = function () {
    return {
        username: this.username,
        bio: this.bio,
        avatar: this.avatar,
        products: this.products,
        followers: this.followers,
        following: this.following,
        userFollow: this.userFollow
    }
}

module.exports = mongoose.model("User", UserSchema);