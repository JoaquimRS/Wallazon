const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");

const ProductSchema = mongoose.Schema({
  slug: {
    type: String,
    lowecase: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String
  },
  price: {
    type: Number
  },
  condition: {
    type: String
  },
  description: {
    type: String,
    maxLength: 300,
  },
  images: {
    type: [String]
  },
  location: {
    lat: {
      type: String
    },
    long: {
      type: String
    },
    city: {
      type :String
    }
  },
  creationDate: {
    type: Date,
    default: Date.now(),
  },
  updateDate: {
    type: Date,
    default: Date.now(),
  },

});

ProductSchema.plugin(uniqueValidator, { message: "is already taken" });

ProductSchema.pre("validate",(next) => {
  if (!this.slug) {
    this.slugify();
  }
  
  next();
});

ProductSchema.methods.slugify = () => {
  this.slug =
    slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
  
  for (let i = 0; i < this.images.length; i++) {
    this.images[i] = this.slug + this.images[i] 
  }
};

ProductSchema.methods.titleProduct = function () {
  return {
    title: this.title
  }
}

module.exports = mongoose.model("Product", ProductSchema);