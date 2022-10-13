const { products } = require("..");
const { Product } = require("../../models/index");
const { param } = require("../../routes");

  exports.findAll = async () => {
    try {
      const data = await Product.find();
      return data;
    } catch (err) {
      return err;
    }
  };
  exports.findSkiped = async (skip) => {
    try {
      const data = await Product.find().skip(skip*4).limit(4);
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.findFilteredProducts = async (filters) =>{
    try {
      const data = await Product.find().skip(filters.offset*filters.limit).limit(filters.limit)
      const numproducts = await Product.find().countDocuments()
      const res = {
        numproducts: numproducts,
        products : data
      }
      return res;
    } catch (err) {
      return err;
    }
  }

  exports.findOne = async (idProduct) => {
    try {
      const data = await Product.findOne({slug:idProduct});
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.addOne = async (productInfo) => {
    try {
      const data = await Product.create(productInfo);
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.deleteOne = async (idProduct) => {
    try {
      const data = await Product.findOneAndDelete({ slug:idProduct});
      return { msg: "Product removed correctly", data: data};
    } catch (err) {
      return err;
    }
  };

  exports.updateOne = async (idProduct,productInfo) => {
    try {
      const data = await Product.updateOne({slug:idProduct},productInfo)
      return { msg: "Product updated correctly", data: data};
    } catch (err) {
        return err;
    }
  }

