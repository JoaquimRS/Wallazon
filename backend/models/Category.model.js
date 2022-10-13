const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
var slug = require("slug");


const CategorySchema = mongoose.Schema({
  slug: {
    type: String,
    lowecase: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    maxLength: 300,
  },
  image: {
    prefix: {type: String},
    name: {type: String}
  },
  subcategories: {
    type: [String]
  },
  products: [{type: mongoose.Schema.Types.ObjectId, ref: "Product"}]

});

CategorySchema.plugin(uniqueValidator, { message: "is already taken" });

CategorySchema.pre("validate", function (next) {
  if (!this.slug) {
    this.slugify();
  }
  next();
});

CategorySchema.methods.slugify = function () {
  this.slug =
    slug(this.title) + '-' + (Math.random() * Math.pow(36, 6) | 0).toString(36);
};

module.exports = mongoose.model("Categorie", CategorySchema);