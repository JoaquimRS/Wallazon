const { products } = require("..");
const { Product } = require("../../models/index");
const { param } = require("../../routes");

  exports.findAll = async () => {
    try {
      const data = await Product.find([["price", 1]]);
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
      let query = {}
      let checkContent = (filter,otherwise) => {
        return filter != "undefined" && filter ? filter : otherwise;
      }
      let order_f
      let limit = checkContent(filters.limit,12)
      let offset = checkContent(filters.offset,0)
      let category = checkContent(filters.category, null)
      let condition = checkContent(filters.condition, null)
      let order = checkContent(filters.order, null)

      if (condition) {
        query.condition = {$in:filters.condition}
      }
      if (category) {
        query.category = {$in:category}
      }
      if (order) {
        order_f=[[order, -1]]

      } else {
        order_f=[["price", 1]]
      }
      
      const res = {
        numproducts: await Product.find(query).countDocuments(),
        products : await Product.find(query).sort(order_f).skip(offset*limit).limit(limit)
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

