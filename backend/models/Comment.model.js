const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");


const CommentSchema = mongoose.Schema({
    uuid_user: {
        type: String,
        required: true
    },
    slug_product:{
        type: String,
        required: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
        
    },
    product:{
        type: mongoose.Schema.Types.ObjectId, ref:"Product",
        required: true
    },
    body:{
        type: String,
        maxLength:300,
    }
});

CommentSchema.pre("validate",function (next) {
    
    next();
})

CommentSchema.methods.toJSON = function () {
    return {
        user: this.user,
        product: this.product,
        body: this.body
    }
}



module.exports = mongoose.model("Comment", CommentSchema);