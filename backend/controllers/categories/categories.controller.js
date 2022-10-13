const { Category } = require("../../models/index")

exports.findAll = async () => {
    try {
      const data = await Category.find();
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.findOne = async (idCategory) => {
    try {
      const data = await Category.findOne({slug:idCategory}).populate("products")
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.addOne = async (categoryInfo) => {
    try {
      const data = await Category.create(categoryInfo);
      return data;
    } catch (err) {
      return err;
    }
  };

  exports.deleteOne = async (idCategory) => {
    try {
      const data = await Category.findOneAndDelete({ slug:idCategory});
      return { msg: "Category removed correctly", data: data};
    } catch (err) {
      return err;
    }
  };

  exports.updateOne = async (idCategory,categoryInfo) => {
    try {
      const data = await Category.updateOne({slug:idCategory},categoryInfo)
      return { msg: "Category updated correctly", data: data};
    } catch (err) {
        return err;
    }
  }

