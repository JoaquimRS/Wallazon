const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");

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
    favorites:[{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"Product"
    }]
})

UserSchema.plugin(uniqueValidator,{message:"is already taken"})

UserSchema.pre("validate",function (next) {
    if (!this.uuid) {
        this.uuidGenerate()
    }
    next()
})

UserSchema.methods.uuidGenerate = function () {
    this.uuid = 
        'wallazon|' + (Math.random() * Math.pow(36, 6) | 0).toString(36)
    this.avatar = this.username + this.avatar

}

module.exports = mongoose.model("User", UserSchema);